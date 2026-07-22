const router = require('express').Router()

router.get('/:conversationId', (req, res) => {
  res.json({ messages: [] })
})

router.post('/', (req, res) => {
  res.json({ message: 'Message sent - placeholder' })
})

module.exports = router
