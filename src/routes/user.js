const express = require('express')
const isAdminLogged = require('../middlewares/isAdminLogged')
const { editUser, getAllUsers, deleteUsers, getUserById } = require('../models/user.model')
const { deleteRequestsByMobileId } = require('../models/request.model')
const { sendSuccess, sendUnkError, logger } = require('../utils')

const router = express.Router()

router.post('/edit', isAdminLogged, async (req, res) => {
	const { user } = req.body

	try {
		await editUser(user)

		logger.trace(user, 'user/edit editted user')
		sendSuccess(res)
	} catch(err) {
		sendUnkError(res, { err, user }, 'edit-user')
	}

})

router.post('/get-all', isAdminLogged, async (req, res) => {
	try {
		const data = await getAllUsers()
		sendSuccess(res, data)
	} catch(err) {
		sendUnkError(res, err, 'get-users')
	}
})

router.post('/delete-multiple', isAdminLogged, async (req, res) => {
	const { userIds } = req.body

	try {
		userIds.forEach(async userId => {
			const user = await getUserById(userId)
			await deleteRequestsByMobileId(user.mobileId)
			
		})

		await deleteUsers(userIds)
		logger.trace({ userIds }, 'user/delete-multiple deleted ids')
		sendSuccess(res)
	} catch(err) {
		sendUnkError(res, { err, userIds }, 'delete-users')
	}
})

module.exports = router

