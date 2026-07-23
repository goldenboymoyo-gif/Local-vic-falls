const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Placeholder routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/businesses', require('./routes/businesses'))
app.use('/api/bookings', require('./routes/bookings'))
app.use('/api/messages', require('./routes/messages'))
app.use('/api/reviews', require('./routes/reviews'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/invoices', require('./routes/invoices'))
app.use('/api/upload', require('./routes/upload'))
app.use('/api/ai', require('./routes/ai'))
app.use('/api/chat', require('./routes/chat'))

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
