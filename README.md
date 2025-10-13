# YOURABSOLUTELYRIGHT.COM

E-commerce merch site selling products featuring "You're absolutely right." - the phrase Claude AI always says.

## Project Overview

**Concept:** Humorous merchandise featuring Claude's iconic phrase
**Stack:** React (Frontend) + Node.js/Express (Backend) + Stripe + Printful
**Design:** Old raggedy aesthetic matching Claude Code's warm beige/tan color palette

## Project Structure

```
yourabsolutelyright/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components (Hero, ProductCard, etc.)
│   │   ├── styles/          # CSS files
│   │   ├── utils/           # Utility functions (Stripe integration)
│   │   └── data/            # Product data
│   └── public/              # Static assets (images, logos)
│
├── backend/                 # Node.js/Express server
│   ├── routes/              # API route handlers
│   │   ├── stripe.js       # Stripe payment endpoints
│   │   └── printful.js     # Printful order endpoints
│   ├── controllers/         # Business logic
│   │   └── orderController.js
│   ├── server.js           # Express server entry point
│   └── .env                # Environment variables (not in git)
│
└── README.md               # This file
```

## What Each Folder Does

### `/frontend`
- React single-page application
- Contains all UI components and styling
- Handles user interactions and product display
- Connects to backend API for payments

### `/backend`
- Express.js REST API server
- Handles Stripe payment processing
- Manages Printful order creation via webhooks
- Processes customer orders automatically

### `/backend/routes`
- **stripe.js** - Creates Stripe checkout sessions
- **printful.js** - Communicates with Printful API for fulfillment

### `/backend/controllers`
- **orderController.js** - Business logic for order processing

## Technology Stack

**Frontend:**
- React (UI framework)
- CSS (styling with old raggedy aesthetic)

**Backend:**
- Node.js (JavaScript runtime)
- Express (web framework)
- Stripe (payment processing)
- Printful API (print-on-demand fulfillment)

**Tools:**
- GitHub Desktop (version control)
- Claude Code (AI development assistant)

## Development Status

- ✅ Day 1: Environment setup, React app initialized
- ✅ Day 2: Backend structure created
- 📅 Day 3+: Design, product setup, and development

## Future Features

- Hero section with "You're" text and Claude logo
- Horizontal scrolling product carousel
- One-click Stripe checkout
- Automated order fulfillment via Printful webhooks
- Success/cancel pages after payment
- Responsive design (mobile, tablet, desktop)

## Environment Variables

The backend requires these API keys in `.env`:
```
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
PRINTFUL_API_KEY=your_printful_api_key
```

**Note:** Never commit `.env` to GitHub - it's in `.gitignore` for security.

## Getting Started (Future)

### Frontend
```bash
cd frontend
npm start
```

### Backend
```bash
cd backend
node server.js
```

---

Built with Claude Code 🤖
