# How to deploy on webtask.io
1. Install the [webtask cli](https://webtask.io/cli)
2. Run the following:
``wt create https://raw.githubusercontent.com/ndethore/webtask-sendgrid-mailinglist-api/app.js --name mongo --secret SENDGRID_API_KEY=<key> --secret SENDGRID_WELCOME_SENDER_EMAIL=<hello@example.com> --secret SENDGRID_WELCOME_SENDER_NAME="<John Doe>"``
3. Test your endpoint:
``curl -H "Content-Type: application/json" -X POST -d '{"email": "test@email.com", "first_name":"Peter Parker"}' <generated webtask url>``
