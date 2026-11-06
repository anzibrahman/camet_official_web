$ErrorActionPreference = 'Stop'
$crmRoot = 'C:\Users\hp\Desktop\CRM.telecalling\backEnd'
$cametRoot = Split-Path $PSScriptRoot -Parent
$crmResolved = (Resolve-Path -LiteralPath $crmRoot).Path
if ($crmResolved -ne 'C:\Users\hp\Desktop\CRM.telecalling\backEnd') { throw 'Unexpected CRM directory' }

# Copy only this feature's new files. Refuse to replace pre-existing work.
$relativeFiles = @(
  'controller/websiteComplaintController.js',
  'model/websiteComplaintVerification.js',
  'helper/websiteComplaintEmail.js',
  'routes/websiteComplaintRoutes.js',
  'tests/websiteComplaint.test.js'
)
foreach ($relative in $relativeFiles) {
  $destination = Join-Path $crmResolved $relative
  if (Test-Path -LiteralPath $destination) { throw "File already exists: $destination" }
}
$serverPath = Join-Path $crmResolved 'server.js'
$serverText = [IO.File]::ReadAllText($serverPath)
$importMarker = 'import bugroutes from "./routes/developer/bugroutes.js"'
$routeMarker = 'app.use("/api/bugreport",bugroutes)'
if (-not $serverText.Contains($importMarker) -or -not $serverText.Contains($routeMarker)) { throw 'CRM server changed; inspect it before installing' }
$serverText = $serverText.Replace($importMarker, $importMarker + "`r`n" + 'import websiteComplaintRoutes from "./routes/websiteComplaintRoutes.js"')
$serverText = $serverText.Replace($routeMarker, $routeMarker + "`r`n" + 'app.use("/api/website-complaints", websiteComplaintRoutes)')

function Read-EnvValue([string] $file, [string] $name) {
  if (-not (Test-Path -LiteralPath $file)) { return '' }
  foreach ($line in [IO.File]::ReadAllLines($file)) {
    if ($line -match ('^\s*' + [regex]::Escape($name) + '\s*=\s*(.*?)\s*$')) { return $Matches[1].Trim('"', "'") }
  }
  return ''
}
function Set-EnvValue([string] $file, [string] $name, [string] $value) {
  $content = if (Test-Path -LiteralPath $file) { [IO.File]::ReadAllText($file) } else { '' }
  $pattern = '(?m)^\s*' + [regex]::Escape($name) + '\s*=.*$'
  if ([regex]::IsMatch($content, $pattern)) { $content = [regex]::Replace($content, $pattern, ($name + '=' + $value)) }
  else { $content = $content.TrimEnd() + "`r`n" + $name + '=' + $value + "`r`n" }
  [IO.File]::WriteAllText($file, $content, [Text.UTF8Encoding]::new($false))
}
$crmEnv = Join-Path $crmResolved '.env'
$cametEnv = Join-Path $cametRoot 'backend/.env'
$crmKey = Read-EnvValue $crmEnv 'CAMET_COMPLAINT_API_KEY'
$cametKey = Read-EnvValue $cametEnv 'CAMET_COMPLAINT_API_KEY'
if ($crmKey -and $cametKey -and $crmKey -ne $cametKey) { throw 'Existing complaint API keys differ; inspect configuration' }
$key = if ($crmKey) { $crmKey } elseif ($cametKey) { $cametKey } else { '' }
if (-not $key) {
  $bytes = New-Object byte[] 32
  $rng = [Security.Cryptography.RandomNumberGenerator]::Create()
  $rng.GetBytes($bytes)
  $rng.Dispose()
  $key = [Convert]::ToHexString($bytes).ToLowerInvariant()
}
if ($key.Length -lt 32) { throw 'Existing complaint API key is too short' }
$crmPort = Read-EnvValue $crmEnv 'PORT'
if ($crmPort -notmatch '^\d{2,5}$') { throw 'CRM PORT is missing or invalid' }

foreach ($relative in $relativeFiles) {
  $destination = Join-Path $crmResolved $relative
  $directory = Split-Path $destination -Parent
  [IO.Directory]::CreateDirectory($directory) | Out-Null
  Copy-Item -LiteralPath (Join-Path $PSScriptRoot ('crm/' + $relative)) -Destination $destination
}
# No existing settings or credentials are printed or replaced.
Set-EnvValue $crmEnv 'CAMET_COMPLAINT_API_KEY' $key
Set-EnvValue $cametEnv 'CAMET_COMPLAINT_API_KEY' $key
if (-not (Read-EnvValue $cametEnv 'CRM_COMPLAINT_API_URL')) { Set-EnvValue $cametEnv 'CRM_COMPLAINT_API_URL' "http://127.0.0.1:$crmPort/api/website-complaints" }
if (-not (Read-EnvValue $crmEnv 'COMPLAINT_BRANCH_NAME')) { Set-EnvValue $crmEnv 'COMPLAINT_BRANCH_NAME' 'CAMET' }
if (-not (Read-EnvValue $crmEnv 'COMPLAINT_NOTIFY_EMAIL')) {
  $recipient = Read-EnvValue $cametEnv 'CONTACT_EMAIL_TO'
  if (-not $recipient) { $recipient = 'Admin@camet.in' }
  Set-EnvValue $crmEnv 'COMPLAINT_NOTIFY_EMAIL' $recipient
}
[IO.File]::WriteAllText($serverPath, $serverText, [Text.UTF8Encoding]::new($false))
Write-Output 'Installed the complaint feature in CRM and configured the private local connection. Existing CRM controllers and schema were not modified.'
