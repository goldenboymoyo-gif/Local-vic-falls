const router = require('express').Router()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '../uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})

const upload = multer({ storage })

router.post('/image', upload.single('image'), (req, res) => {
  res.json({ message: 'Image uploaded - placeholder', file: req.file })
})

router.post('/gallery', upload.array('gallery', 10), (req, res) => {
  res.json({ message: 'Gallery uploaded - placeholder', files: req.files })
})

module.exports = router
