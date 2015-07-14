var crypto = Npm.require("crypto");

const password = 'V\\{aLj0v)buaZy"0a{eY]'
const algorithm = 'sha256'

const salt = "r'(Ry]M,]qF*GaiI@;CoFz"

function hash(text){
  var cipher = crypto.createHash(algorithm, password)
  return cipher.update(text).digest('hex');
}

function hashAddres(mailaddress){
	return hash(salt + mailaddress)
}

Mailjet.hashAddres = hashAddres