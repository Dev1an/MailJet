const baseUrl = 'https://api.mailjet.com/v3/REST/'
const contactUrl = baseUrl + 'contact/'

Mailjet = {
	contact: contact,
	addRecipient: addRecipient
}

function getContact(id) {
	var result
	try {
		result = HTTP.get(contactUrl + id, auth).data
	} catch (error) {
		result = {Count: 0}
	}
	return result
}

function createContact(mailAddress) {
	return HTTP.post(contactUrl, _.extend({
		data: {
			Email: mailAddress
		}
	}, auth)).data
}

function contact(mailAddress) {
	const contacts = getContact(mailAddress)
	var contact
	if (contacts.Count > 0) {
		return contacts.Data[0]
	} else {
		return createContact(mailAddress).Data[0]
	}
}

function addRecipient(contactId, listId) {
	HTTP.post(baseUrl + 'listrecipient/', _.extend({
		data: {
			ContactID: contactId,
			ListID: listId,
			IsActive: true
		}
	}, auth))
}

var auth = {
	auth: Meteor.settings.mailjet.apiKey + ':' + Meteor.settings.mailjet.secretKey
}