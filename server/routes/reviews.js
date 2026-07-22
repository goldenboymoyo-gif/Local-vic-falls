const router = require('express').Router()

router.get('/:businessId', (req, res) => {
  res.json({ reviews: [] })
})

router.post('/', (req, res) => {
  res.json({ message: 'Review created - placeholder' })
})

module.exports = router
