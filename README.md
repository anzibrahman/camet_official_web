# camet_official_web

## Tally service booking link

Configure the Tally button to open this URL in the user's browser:

```text
https://camet.in/?bookService=true&licenceNumber=123456
```

Replace `123456` with the customer's licence number. The website opens the booking
modal and prefills the licence number; the existing verification is still required.
To open the form without prefilling, use `https://camet.in/?bookService=true`.

The frontend URL builder is `getBookServiceUrl(licenceNumber)` in
`frontend/src/utils/constants.js`, with `https://camet.in` as the site URL.
Deploy the frontend changes before using these links on the live site.
