const express = require('express')
const path = require('path')
const { getUserById } = require('../models/user.model')
const { logger, sendAuthError, sendUnkError, sendSuccess } = require('../utils')
const { videosPath, disableSS } = require('../config')
const isAdminLogged = require('../middlewares/isAdminLogged')

const router = express.Router()

router.get('/view', async (req, res) => {
	const { userId, videoId } = req.query
	logger.trace({ userId, videoId }, 'general/view')

	try {
		if(await getUserById(userId)) {
			res.sendFile(path.resolve(__dirname, '../' + videosPath + videoId + '.mp4'))
		} else {
			sendAuthError(res, { userId, videoId }, 'view-video')
		}
	} catch(err) {
		sendUnkError(res, { err, userId, videoId }, 'view-video')
	}

})


router.get('/ss', (req, res) => {
	sendSuccess(res, { disableSS })
})

router.post('/admin-login', isAdminLogged, (req, res) => {
	sendSuccess(res)
})

module.exports = router

