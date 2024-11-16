const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const { getRequestByMobileId, getRequestById, addRequest, editRequest,
	getAllRequests, deleteRequests } = require('../models/request.model')
const { editUser, addUser, getUserByMobileId } = require('../models/user.model')
const isAdminLogged = require('../middlewares/isAdminLogged')
const { logger, sendValidationError, sendSuccess, sendUnkError, addCourses, log } = require('../utils')
const { receiptsPath } = require('../config')

const router = express.Router()

const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, `../${receiptsPath}`))
		},
		filename: (req, file, cb) => {
			cb(null, req.params.requestId)
		}
	})
})

router.post('/upload/:requestId', upload.single('image'), (req, res) => {
	logger.trace({ requestId: req.params.requestId }, 'request/upload image uploaded')
	sendSuccess(res)
})

router.post('/get-state', async (req, res) => {
	const { mobileId } = req.body
	logger.trace({ mobileId }, 'request/get-state run')
	
	try {
		const request = await getRequestByMobileId(mobileId)
		const user = await getUserByMobileId(mobileId)

		logger.trace({ request, user }, 'request/get-state')

		if(!request && !user) {
			sendSuccess(res, {
				state: 'new',
			})
			logger.trace({ mobileId }, 'request/get-state new')
			return
		}

		if(user) {
			sendSuccess(res, {
				user,
				state: 'approved',
			})
			logger.trace({ mobileId }, 'request/get-state approved')
		} else {
			sendSuccess(res, {
				state: 'open',
			})
			logger.trace({ mobileId }, 'request/get-state open')
		}

	} catch(err) {
		sendUnkError(res, { err, mobileId, }, 'get-request-state')
	}
})

router.post('/add', async (req, res) => {
	const { request } = req.body

	try {
		const addedRequest = await addRequest(request)

		logger.trace(addedRequest, 'request/add added request')
		sendSuccess(res, { requestId: addedRequest.requestId })
	} catch(err) {
		sendValidationError(res, { err, request }, 'add-request')
	}

})

router.post('/approve', isAdminLogged, async (req, res) => {
	const { requestId } = req.body

	try {
		const fetchedRequest = await getRequestById(requestId)
		const fetchedUser = await getUserByMobileId(fetchedRequest.mobileId)
		if(fetchedUser) {
			await editUser({
				userId: fetchedUser.userId,
				enrolledCourses: addCourses(fetchedUser.enrolledCourses, fetchedRequest.packageCourses)
			})
		} else {
			await addUser({
				...fetchedRequest,
				enrolledCourses: fetchedRequest.packageCourses,
			})
		}

		await editRequest({
			...fetchedRequest,
			approved: true,
		})

		logger.trace(fetchedUser, 'request/approve approved user')
		sendSuccess(res)
	} catch(err) {
		sendValidationError(res, { err, requestId }, 'approve-request')
	}
})

router.post('/get-all', isAdminLogged, async (req, res) => {
	try {
		const data = await getAllRequests()
		sendSuccess(res, data)
	} catch(err) {
		sendUnkError(res, err, 'get-requests')
	}
})

router.post('/delete-multiple', isAdminLogged, async (req, res) => {
	const { requestIds } = req.body

	try {
		await deleteRequests(requestIds)
		logger.trace({ requestIds }, 'request/delete-multiple ids deleted')

		requestIds.forEach(requestId => {
			fs.unlink(path.join(__dirname, `../${receiptsPath}/${requestId}`), err => {
				if(err)
					logger.fatal({ requestId }, 'couldnt delete receipt file')
			})
		})
		sendSuccess(res)
	} catch(err) {
		sendUnkError(res, { err, requestIds }, 'delete-requests')
	}
})


module.exports = router
