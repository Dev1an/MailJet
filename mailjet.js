const baseUrl = 'https://api.mailjet.com/v3/REST/'
const contactUrl = baseUrl + 'contact/'

var getContact = Meteor.wrapAsync(function (id, callback) {
	HTTP.get(contactUrl + id, auth, function(error, result) {
		if (error) {
			callback(error, {Count: 0})
		} else {
			callback(error, result.data)
		}
	})
})

var createContact = Meteor.wrapAsync(function (mailAddress, callback) {
	return HTTP.post(contactUrl, _.extend({
		data: {
			Email: mailAddress
		}
	}, auth), function(error, result) {
		callback(error, result.data)
	})
})

var contact = Meteor.wrapAsync(function (mailAddress, callback) {
	const contacts = getContact(mailAddress)
	var contact
	if (contacts.Count > 0) {
		callback(undefined, contacts.Data[0])
	} else {
		callback(undefined, createContact(mailAddress).Data[0])
	}
})

var addRecipient = function (contactId, listId, callback) {
	HTTP.post(baseUrl + 'listrecipient/', _.extend({
		data: {
			ContactID: contactId,
			ListID: listId,
			IsActive: true
		}
	}, auth), callback)
}

var auth = {
	auth: Meteor.settings.mailjet.apiKey + ':' + Meteor.settings.mailjet.secretKey
}

Mailjet = {
	contact: contact,
	addRecipient: addRecipient
}