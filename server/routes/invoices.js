const router = require('express').Router()

// Placeholder invoice generation - returns a professional invoice without processing payments
router.post('/generate', (req, res) => {
  const { bookingId, businessName, customerName, services, total } = req.body

  const invoice = {
    invoiceNumber: `INV-${Date.now().toString(36).toUpperCase()}`,
    date: new Date().toISOString(),
    businessName: businessName || 'ConnectHub Business',
    customerName: customerName || 'Customer',
    services: services || [{ name: 'Service', price: 0 }],
    subtotal: total || 0,
    tax: 0,
    total: total || 0,
    status: 'pending',
    paymentTerms: 'Due within 30 days',
    notes: 'Payment integration coming soon. This is a placeholder invoice.',
  }

  res.json({ invoice })
})

router.get('/:userId', (req, res) => {
  res.json({ invoices: [] })
})

module.exports = router
