const baseUrl = 'https://api.mailjet.com/v3/REST/'
const contactUrl = baseUrl + 'contact/'
const listRecipientUrl = baseUrl + 'listrecipient/'

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
	getContact(mailAddress, function(error, result) {
		if (result.Count > 0) {
			callback(undefined, result.Data[0])
		} else {
			callback(undefined, createContact(mailAddress).Data[0])
		}
	})
})

var addRecipient = Meteor.wrapAsync(function (contactId, listId, callback) {
	HTTP.post(listRecipientUrl, _.extend({
		data: {
			ContactID: contactId,
			ListID: listId,
			IsActive: true
		}
	}, auth), callback)
})

var getRecipient = Meteor.wrapAsync(function (contactId, listId, callback) {
	HTTP.get(listRecipientUrl, _.extend({
		params: {
			"Contact": contactId,
			"ContactsList": listId,
		}
	}, auth), callback)
})

var subscribeRecipient = Meteor.wrapAsync(function (recipientId, callback) {
	HTTP.put(listRecipientUrl + recipientId, _.extend({
		data: {
			IsUnsubscribed: false
		}
	}, auth), callback)
	console.log("resubscribing")
})

var subscribe = Meteor.wrapAsync(function(mailAddress, listId, callback) {
	const contactId = contact(mailAddress).ID
	const recipients = getRecipient(contactId, listId).data
	if (recipients.Count > 0 && recipients.Data[0].IsUnsubscribed) {
		const recipientId = recipients.Data[0].ID
		subscribeRecipient(recipientId, callback)
	} else {
		addRecipient(contactId, listId, callback)
	}
})

var auth = {
	auth: Meteor.settings.mailjet.apiKey + ':' + Meteor.settings.mailjet.secretKey
}

Mailjet = {
	contact: contact,
	addRecipient: addRecipient,
	subscribe: subscribe,
	subscribeRecipient: subscribeRecipient,
	getRecipient: getRecipient
}