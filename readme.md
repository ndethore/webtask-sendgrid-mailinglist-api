# Sendgrid Mailing List API
Quickly deploy a serverless mailing list subscription API endpoint using [Webtask.io](https://webtask.io) and [Sendgrid](https://sendgrid.com). Ready to use for collecting emails from static site and optionally, send a welcome email.

### Prerequisites
* Sign up to Sendgrid
* Create a verified sender
* (Optional) Create a welcome email template

## Getting started
Install the webtask.io command line interface

`$ npm install wt-cli -g`

(Optional) Create an webtask.io account

`$ wt init youremail@example.com`

Create a webtask using the api function public url and specify the required environment variables

`$ wt create https://raw.githubusercontent.com/ndethore/webtask-sendgrid-mailinglist-api/app.js --name mailing-api --secret SENDGRID_API_KEY=<key> --secret SENDGRID_WELCOME_SENDER_EMAIL="hello@example.com" --secret SENDGRID_WELCOME_SENDER_NAME="John Doe"`

Once the webtask is successfully deployed, `wt create` will output a public url looking like this `<webtask-account-id>.sandbox.auth0-extend.com/mailing-api`

## Usage
The endpoint accepts `POST` HTTP requests with the following payload format:

```json
{
	"first_name": "Jhonny",
	"email": "jonny@appleseed.com"
}
```

Add the query parameter `?welcome_email=true` to email newly added recipients using the specified Sendgrid template ID.

You can test your API using `curl`: 

``curl -H "Content-Type: application/json" -X POST -d '{"email": "test@email.com", "first_name":"Peter Parker"}' <generated webtask url>``


## License

MIT