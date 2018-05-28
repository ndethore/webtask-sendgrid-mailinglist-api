'use latest';
const client = require('@sendgrid/client');

function addSendgridRecipient(client, email, firstName) {
	return new Promise((fulfill, reject) => {
		const data = [{
			email: email,
			first_name: firstName
		}];
		const request = {
			method: 'POST',
			url: '/v3/contactdb/recipients',
			body: data
		};

		client.request(request)
		.then(([response, body]) => {
			console.log(response.statusCode);
			console.log(body);
			fulfill(response);
			// cb(null, response);
		}).catch(error => reject(error));
	});
}


function sendWelcomeEmail(client, email, firstName) {
	return new Promise((fulfill, reject) => {
		const data = {
			from: {
				email: context.secrets.SENDGRID_WELCOME_SENDER_EMAIL,
				name: context.secrets.SENDGRID_WELCOME_SENDER_NAME
			},
			reply_to: {
				email: context.secrets.SENDGRID_WELCOME_SENDER_EMAIL
			},
			personalizations: [{
				to: [{
					email: email,
					name: firstName
				}],
				substitutions: {
					"<%name%>": firstName
				}
			}],
			template_id: context.secrets.SENDGRID_WELCOME_TEMPLATE_ID
		};

		const request = {
			method: 'POST',
			url: '/v3/mail/send',
			body: data
		};

		client.request(request)
		.then(([response, body]) => {
			console.log(response.statusCode);
			console.log(body);
			fulfill(response);
			// cb(null, response);
		}).catch(error => reject(error));

	});
}


module.exports = (context, cb) => {
	// console.log(JSON.stringify(context));
	let email = context.body.email;
	let firstName = context.body.first_name;
	client.setApiKey(context.secrets.SENDGRID_API_KEY);
	addSendgridRecipient(client, email, firstName)
	.then((response) => {
		sendWelcomeEmail(client, email, firstName)
		.then( response => cb(null, response))
		.catch(cb);
	 })
	 .catch(cb);
};
