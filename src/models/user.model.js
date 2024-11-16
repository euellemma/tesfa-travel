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

	enrolledCourses: {
		required: true,
		type: String
	},

	advertizer: {
		required: true,
		type: String
	},

})

const UserModel = mongoose.model('User', dataSchema) 

const addUser = async (user) => {
	const newUser = new UserModel({
		name: user?.name,
		phone: user?.phone,
		mobileId: user?.mobileId,
		email: user?.email,
		joinedDate: user?.joinedDate,
		enrolledCourses: user?.enrolledCourses,
		advertizer: user?.advertizer,
	})

	return await newUser.save()
}

const editUser = async (user) => {
	await UserModel.findByIdAndUpdate({
		_id: user?.userId
	}, user)
}

const getUserById = async (userId) => {
	const user = await UserModel.findById(userId)
	if(!user)
		return null

	return ({
		...user._doc,
		userId: user._id,
	})
}

const getUserByMobileId = async (mobileId) => {
	const user = await UserModel.findOne({ mobileId })
	if(!user)
		return null

	return ({
		...user._doc,
		userId: user._id,
	})
}

const getAllUsers = async () => {
	const data = await UserModel.find()
	const idUpdatedData = data.map(user => ({
		...user._doc,
		userId: user._id,
	}))

	return idUpdatedData
}

const deleteUsers = async (userIds) => {
	await UserModel.deleteMany({
		_id: {
			$in: userIds,
		}
	})
}

module.exports = {
	UserModel,
	editUser,
	getAllUsers,
	getUserById,
	getUserByMobileId,
	deleteUsers,
	addUser,
}
