# Contact form email

Set EMAIL_USER and EMAIL_PASS in the backend runtime environment. With the
default Gmail transport, EMAIL_PASS must be a Gmail app password for EMAIL_USER.
Local .env values are not automatically installed on a hosting provider.
Restart the backend after changing environment variables.

For another SMTP provider, also set SMTP_HOST and SMTP_PORT (default 587).
SMTP_SECURE defaults to true for port 465 and false for other ports, where
STARTTLS is used when offered. CONTACT_EMAIL_TO defaults to admin@camet.in.

Run `npm run check:email` from the backend directory on the machine hosting
the backend. It checks connectivity and authentication without sending mail;
it does not prove that a particular message will be accepted or delivered.

If submission still fails, inspect the server's `Contact email failed` log:

- EMAIL_CONFIG: missing credentials or invalid SMTP port.
- EAUTH / 535: rejected credentials; check the deployed account and app password.
- ETIMEDOUT / ECONNECTION / ESOCKET: check the host's outbound SMTP access and SMTP settings.
- EENVELOPE / 550 / 553: check the sender, recipient, and provider sending restrictions.

If hosting blocks SMTP, use a provider-supported HTTPS email API or hosting
that allows SMTP. Changing credentials cannot resolve a blocked connection.
