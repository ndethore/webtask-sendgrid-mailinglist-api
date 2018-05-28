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


function sendWelcomeEmail(client, email, firstName, senderEmail, senderName, welcomeTemplateID) {
	return new Promise((fulfill, reject) => {
		const data = {
			from: {
				email: senderEmail,
				name: senderName
			},
			reply_to: {
				email: senderEmail
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
			template_id: welcomeTemplateID
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
	console.log(JSON.stringify(context));
	const email = context.body.email;
	const firstName = context.body.first_name;
	const welcomeEmail = context.query.welcome_email;

	client.setApiKey(context.secrets.SENDGRID_API_KEY);
	addSendgridRecipient(client, email, firstName)
	.then((response) => {

		if (welcomeEmail === "true" || welcomeEmail === "1") {
			const senderEmail = context.secrets.SENDGRID_WELCOME_SENDER_EMAIL;
			const senderName = context.secrets.SENDGRID_WELCOME_SENDER_NAME;
			const welcomeTemplateID = context.secrets.SENDGRID_WELCOME_TEMPLATE_ID;

			sendWelcomeEmail(client, email, firstName, senderEmail, senderName, welcomeTemplateID)
			.then( response => cb(null, response))
			.catch(cb);
		} else {
			cb(null, response);
		}
	 })
	 .catch(cb);
};
