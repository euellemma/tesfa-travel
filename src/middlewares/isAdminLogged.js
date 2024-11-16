const { adminCreds } = require('../config')
const { sendAuthError } = require('../utils')

const isAdminLogged = (req, res, next) => {
	if(
		!req.body?.adminCreds ||
		!req.body?.adminCreds?.email ||
		!req.body?.adminCreds?.password ||

		req.body?.adminCreds?.email != adminCreds?.email ||
		req.body?.adminCreds?.password != adminCreds?.password
	) {
		sendAuthError(res, {}, 'is-admin-logged')
	} else {
		next()
	}
}

module.exports = isAdminLogged

