// Placeholder auth routes - will integrate Clerk/Firebase
const router = require('express').Router()

router.post('/register', (req, res) => {
  res.json({ message: 'Auth registration endpoint - placeholder' })
})

router.post('/login', (req, res) => {
  res.json({ message: 'Auth login endpoint - placeholder' })
})

router.post('/forgot-password', (req, res) => {
  res.json({ message: 'Forgot password endpoint - placeholder' })
})

module.exports = router
