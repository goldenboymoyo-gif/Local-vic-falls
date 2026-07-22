const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({ users: [] })
})

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'User placeholder' })
})

router.put('/:id', (req, res) => {
  res.json({ message: 'User updated - placeholder' })
})

module.exports = router
