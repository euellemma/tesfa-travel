const multer = require('multer')
const express = require('express')
const path = require('path')

const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, `../receipt/`))
		},
		filename: (req, file, cb) => {
			cb(null, req.params.requestId)
		}
	})
})

const router = express.Router()

router.post('/upload/:requestId', upload.single('image'), (req, res) => {
	res.send({ success: true })
})

router.use('/receipts', express.static(path.join(__dirname, '../receipts')))


module.export = router
