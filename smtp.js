Meteor.startup(function() {
	const settings = Meteor.settings.mailjet
	process.env.MAIL_URL = "smtp://" + settings.apiKey + ":" + settings.secretKey + "@in-v3.mailjet.com:25/"
})