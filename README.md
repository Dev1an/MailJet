# Installation

Add the atmosphere package to your app: `meteor add devian:mailjet`

Use the followng `settings.json` file with your app (see [Meteor docs page](http://docs.meteor.com/#/full/meteor_settings) for more info on settings.json):

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
       Email: 'info@devian.tk',
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
