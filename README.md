# Installation

Add the atmosphere package to your app: `meteor add devian:mailjet`

Use the followng `settings.json` file with your app:

```js
{
  ...
  "mailjet": {
    "apiKey": "<API KEY>",
    "secretKey": "<SECRET KEY>"
  }
  ...
}
```

# Usage

## Retreive contacts

Retreive a contact with `Mailjet.contact(address: String)`. When there is no contact with this email address, a new contact will be creates automatically.

### Example: 

```js
Mailjet.contact('info@devian.tk')
```
returns
```js
{ Count: 1,
  Data: 
   [ { CreatedAt: '2015-07-13T09:59:17Z',
       DeliveredCount: 0,
       Email: 'damiaan@me.com',
       ID: 1479886203,
       IsOptInPending: false,
       IsSpamComplaining: false,
       LastActivityAt: '2015-07-13T09:59:17Z',
       LastUpdateAt: '',
       Name: '',
       UnsubscribedAt: '',
       UnsubscribedBy: '' } ],
  Total: 1
}
```

## Add a contact to a list 

`Mailjet.addRecipient(contactId, listId)`
