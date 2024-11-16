const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const { serverPort, mongoString, siteAppPathv2, siteAppPathv3, siteAdminPath, siteLandingPath, receiptsPath, siteAppRoutev2, siteAppRoutev3, siteAdminRoute, videosPath } = require('./config')
const { logger } = require('./utils')

const userRouter = require('./routes/user')
const requestRouter = require('./routes/request')
const generalRouter = require('./routes/general')

mongoose.connect(mongoString)
const database = mongoose.connection
database.on('error', (error) => {
	logger.error(error, 'Database error')
})

database.once('connected', () => {
	logger.info('Database connected')
})

const app = express()
app.use(cors())
app.use(express.json())


app.use('/', express.static(path.join(__dirname, siteLandingPath)))
app.use('/user', userRouter)
app.use('/request', requestRouter)
app.use('/general', generalRouter)
app.use(siteAppRoutev2, express.static(path.join(__dirname, siteAppPathv2)))
app.use(siteAppRoutev3, express.static(path.join(__dirname, siteAppPathv3)))
app.use(siteAdminRoute, express.static(path.join(__dirname, siteAdminPath)))
app.use('/app-test', express.static(path.join(__dirname, '../../tesfa-webapp-test')))
app.use('/privacy-policy', express.static(path.join(__dirname, '../privacy-policy.html')))
app.use('/receipts', express.static(path.join(__dirname, receiptsPath)))
app.use('/bmEUvc8vb3HWz', express.static(path.join(__dirname, '../../tesfa-videos')))

// NO NEED TO USE videoData, IT'S THERE JUST TO LOOK NICE
app.get('/loader/:videoData', (req, res) => { res.send("<h1>Please wait till video loads</h1>") })
app.get('/active/', (req, res) => {
	res.send('server is active')
	logger.info('Activity checked: server active')
})

app.get('/delete-this-link/:videoId', (req, res) => {
	const { videoId } = req.params
	res.sendFile(path.resolve(__dirname, videosPath + videoId + '-720.mp4'))
} )

app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

app.listen(serverPort, () => {
	logger.info(`Server started at ${serverPort}`)
})
