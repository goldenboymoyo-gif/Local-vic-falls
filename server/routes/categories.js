const router = require('express').Router()

router.get('/', (req, res) => {
  const categories = [
    'Electricians', 'Plumbers', 'Carpenters', 'Welders', 'Painters',
    'Mechanics', 'Cleaning Services', 'Security Services', 'Photographers',
    'Videographers', 'Event Planners', 'Caterers', 'Restaurants', 'Hotels',
    'Tour Guides', 'Fitness Trainers', 'Tutors', 'Accountants', 'Lawyers',
    'Doctors', 'Clinics', 'Dentists', 'Pharmacies', 'Salons', 'Barbers',
    'Beauty Therapists', 'Real Estate Agents', 'Housekeepers',
    'Garden & Landscaping', 'Appliance Repair', 'Mobile Phone Repair',
    'Computer Repair', 'Tailors', 'Interior Designers', 'Architects',
    'Construction Companies', 'Hardware Stores', 'Furniture Makers',
    'Pest Control', 'Child Care', 'Elderly Care', 'Funeral Services',
    'Printing Services', 'Car Wash', 'Vehicle Repair', 'Auto Parts',
    'Electronics Shops', 'Grocery Stores', 'Supermarkets', 'Boutiques',
    'Clothing Stores', 'Florists',
  ]
  res.json({ categories })
})

module.exports = router
