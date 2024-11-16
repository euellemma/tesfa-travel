const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String
	},

	phone: {
		required: true,
		type: String
	},

	mobileId: {
		required: true,
		type: String
	},

	email: {
		required: false,
		type: String
	},

	joinedDate: {
		required: true,
		type: String
	},

	packageCourses: {
		required: true,
		type: String
	},

	advertizer: {
		required: true,
		type: String
	},

	approved: {
		type: Boolean,
		default: false,
	},

	bank: {
		type: String,
		default: 'Unassigned',
	}

})

const RequestModel = mongoose.model('Request', dataSchema)

const addRequest = async (request) => {
	const newRequest = new RequestModel({
		name: request?.name,
		phone: request?.phone,
		mobileId: request?.mobileId,
		email: request?.email,
		joinedDate: request?.joinedDate,
		packageCourses: request?.packageCourses,
		advertizer: request?.advertizer,
		approved: request?.approved,
		bank: request?.bank,
	})

	const addedRequest = await newRequest.save()

	return ({ ...addedRequest, requestId: addedRequest._id })
}

const getAllRequests = async () => {
	const data = await RequestModel.find({})
	const idUpdatedData = data.map(request => ({
		...request._doc,
		requestId: request._id,
	}))
	
	return idUpdatedData
}

const editRequest = async (request) => {
	await RequestModel.findByIdAndUpdate({
		_id: request?.requestId,
	}, request)
}

const deleteRequests = async (requestIds) => {
	await RequestModel.deleteMany({
		_id: {
			$in: requestIds
		}
	})
}

const deleteRequestsByMobileId = async (mobileId) => {
	await RequestModel.deleteMany({
		mobileId
	})
}

const getRequestById = async (requestId) => {
	const request = await RequestModel.findById(requestId)
	if(!request)
		return null

	return ({
		...request._doc,
		requestId: request._id,
	})
}

const getRequestByMobileId = async (mobileId) => {
	const request = await RequestModel.findOne({ mobileId })
	if(!request)
		return null

	return ({
		...request._doc,
		requestId: request._id,
	})
}


module.exports = {
	addRequest,
	getAllRequests,
	deleteRequests,
	deleteRequestsByMobileId,
	getRequestById,
	getRequestByMobileId,
	editRequest,
	RequestModel,
}

