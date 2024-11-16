const pino = require('pino')

const sendValidationError = (res, error, name = 'app') => {
	res.send({
		success: false,
		errorCode: 'ERR_VALIDATION',
		errorMessage: error?.message
	})
	logger.debug(error, name + '-validation-error')
}

const sendUnkError = (res, error, name = 'app') => {
	res.send({
		success: false,
		errorCode: 'ERR_UNKNOWN',
		errorMessage: error?.message
	})
	logger.debug(error, name + '-unk-error')
}

const sendAuthError = (res, error, name = 'app') => {
	res.send({
		success: false,
		errorCode: 'ERR_AUTH',
		errorMessage: error?.message,
	})
	logger.debug(error, name + '-auth-error')
}

const sendSuccess = (res, body) => {
	const resObj = {
		success: true,
		...(body ? { body } : {})
	}


	res.send(resObj)
}

const addCourses = (enrolledCourses, packageCourses) => {
	const enrolledCoursesSplitted = enrolledCourses.split(',')

	packageCourses.split(',').forEach(course => {
		if(enrolledCourses.includes(course))
			return

		enrolledCoursesSplitted.push(course)
	})


	return enrolledCoursesSplitted.join(',')
}

const transport = pino.transport({
	targets: [
		{ target: 'pino/file', options: { destination: '/var/log/tesfa-server.log' },
			level: 'trace' },
		{ target: 'pino-pretty',
			options: { colorize: true },
			level: process.env.PINO_LOG_LEVEL || 'trace' },
	]
})

const logger = pino(
	{
		level: process.env.PINO_LOG_LEVEL || 'trace',
		timestamp: pino.stdTimeFunctions.isoTime,
	},
	transport,
)


module.exports = {
	sendValidationError,
	sendSuccess,
	sendUnkError,
	sendAuthError,
	addCourses,
	logger,
}
