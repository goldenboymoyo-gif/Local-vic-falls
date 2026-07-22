const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({ bookings: [] })
})

router.post('/', (req, res) => {
  res.json({ message: 'Booking created - placeholder', booking: req.body })
})

router.put('/:id/status', (req, res) => {
  res.json({ message: 'Booking status updated - placeholder' })
})

module.exports = router
