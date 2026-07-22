const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({ businesses: [] })
})

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Business name', category: 'Electrician' })
})

router.post('/', (req, res) => {
  res.json({ message: 'Business created - placeholder' })
})

router.put('/:id', (req, res) => {
  res.json({ message: 'Business updated - placeholder' })
})

module.exports = router
