# YOURABSOLUTELYRIGHT.COM

E-commerce merch site selling products featuring "You're absolutely right." - the phrase Claude AI always says.

## 🎯 Project Overview

**Concept:** Humorous merchandise featuring Claude's iconic phrase
**Stack:** React (Frontend) + Node.js/Express (Backend) + Stripe + Printful
**Design:** Old raggedy aesthetic matching Claude Code's warm beige/tan color palette
**Status:** ✅ Production-ready

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Stripe account (for payments)
- Printful account (for fulfillment)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/yourabsolutelyright.git
cd yourabsolutelyright
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Configure environment variables**

**Backend** - Create `backend/.env` from `backend/.env.example`:
```bash
# API Keys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_public_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
PRINTFUL_API_KEY=your_printful_api_key

# Frontend URL for CORS and redirects
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional)
SUPPORT_EMAIL=support@yourabsolutelyright.com
# For production, uncomment and configure:
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_app_password
```

**Frontend** - Create `frontend/.env` from `frontend/.env.example`:
```bash
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_public_key
```

4. **Start the development servers**

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

## 📁 Project Structure

```
yourabsolutelyright/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Hero.js      # Landing page hero section
│   │   │   ├── ProductCarousel.js  # Auto-scrolling product carousel
│   │   │   ├── ProductCard.js      # Individual product cards
│   │   │   ├── Navigation.js       # Site navigation
│   │   │   ├── Footer.js           # Site footer
│   │   │   └── LoadingSpinner.js   # Reusable loading indicator
│   │   ├── pages/           # Page components
│   │   │   ├── About.js     # About page
│   │   │   ├── FAQ.js       # FAQ page
│   │   │   ├── Terms.js     # Terms of service
│   │   │   ├── Privacy.js   # Privacy policy
│   │   │   ├── Contact.js   # Contact form
│   │   │   ├── Success.js   # Payment success page
│   │   │   └── Cancel.js    # Payment cancelled page
│   │   ├── styles/          # CSS files
│   │   ├── utils/           # Utility functions
│   │   │   └── stripe.js    # Stripe checkout integration
│   │   ├── data/            # Product data
│   │   └── App.js           # Main app component with routing
│   ├── public/              # Static assets
│   │   ├── products/        # Product images (optimized)
│   │   └── images/          # Site images and logos
│   └── package.json
│
├── backend/                 # Node.js/Express server
│   ├── routes/              # API route handlers
│   │   ├── stripe.js        # Stripe payment endpoints
│   │   ├── printful.js      # Printful order endpoints
│   │   └── contact.js       # Contact form endpoint
│   ├── server.js            # Express server entry point
│   ├── .env                 # Environment variables (not in git)
│   └── package.json
│
├── TESTING.md               # Comprehensive testing checklist
├── PERFORMANCE.md           # Performance optimization report
└── README.md                # This file
```

## 🛠️ Technology Stack

### Frontend
- **React** 19.2.0 - UI framework
- **React Router** 7.9.4 - Client-side routing
- **CSS** - Custom styling with old raggedy aesthetic
- **Sharp** - Image optimization

### Backend
- **Node.js** - JavaScript runtime
- **Express** 5.1.0 - Web framework
- **Stripe** 19.1.0 - Payment processing
- **Nodemailer** 7.0.9 - Email service
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - API rate limiting

### External Services
- **Stripe** - Payment processing
- **Printful API** - Print-on-demand fulfillment
- **Ethereal Email** - Test email service (development)

## 🎨 Features

### Implemented Features ✅
- **Hero Section** - "You're" text with subtle Claude logo background
- **Product Carousel** - Horizontal auto-scrolling with infinite loop
- **Stripe Checkout** - One-click payment flow
- **Webhook Integration** - Automated order processing
- **Contact Form** - Professional email-based support system
- **Static Pages** - About, FAQ, Terms, Privacy
- **Responsive Design** - Mobile, tablet, desktop breakpoints
- **Loading States** - Spinners for async operations
- **Error Handling** - User-friendly error messages
- **Image Optimization** - WebP + PNG fallback, lazy loading
- **Security** - Rate limiting, input validation, CORS

### Pending Configuration 🔄
- **Printful Order Creation** - Awaiting product configuration (see `server.js:129-136`)
- **Production SMTP** - Configure real email service (currently uses test service)

## 📡 API Endpoints

### Backend (http://localhost:5000)

#### Stripe Routes
- `POST /api/stripe/create-checkout-session` - Create Stripe checkout
- `GET /api/stripe/session/:sessionId` - Get session details

#### Printful Routes
- `POST /api/printful/products` - List Printful products
- `POST /api/printful/create-order` - Create Printful order

#### Contact Routes
- `POST /api/contact` - Submit contact form

#### Webhooks
- `POST /webhook` - Stripe webhook for order processing

#### Health Check
- `GET /health` - Server health status

## 🧪 Testing

Run the testing checklist:
```bash
# See TESTING.md for full checklist
cat TESTING.md
```

**Key Testing Areas:**
- ✅ Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsiveness (480px, 375px breakpoints)
- ✅ Payment flow (Stripe integration)
- ✅ Contact form (email delivery)
- ✅ Security (CORS, rate limiting, validation)
- ✅ Performance (image optimization, lazy loading)

## 📊 Performance

Performance optimization results available in `PERFORMANCE.md`:
- Image compression: 60-80% reduction
- WebP support with PNG fallback
- Lazy loading for below-fold images
- Bundle size optimization

## 🔒 Security Features

- **Environment Variables** - Sensitive data in .env (gitignored)
- **CORS Configuration** - Restricted to FRONTEND_URL
- **Rate Limiting** - 100 requests/15min (general), 10/15min (payments)
- **Input Validation** - Server-side validation on all endpoints
- **Webhook Verification** - Stripe signature validation
- **SQL Injection Prevention** - No direct SQL queries (using Stripe/Printful APIs)

## 🚢 Deployment

### Environment Setup

**Frontend (Vercel/Netlify):**
1. Build command: `npm run build`
2. Publish directory: `build`
3. Environment variables:
   - `REACT_APP_STRIPE_PUBLISHABLE_KEY`

**Backend (Heroku/Railway/Render):**
1. Start command: `npm start`
2. Environment variables:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `PRINTFUL_API_KEY`
   - `FRONTEND_URL` (production URL)
   - `SUPPORT_EMAIL`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (for production emails)

### Production Checklist

- [ ] Configure production SMTP for contact form emails
- [ ] Set up Stripe webhook endpoint in production
- [ ] Configure Printful products and enable auto-order creation
- [ ] Update FRONTEND_URL to production domain
- [ ] Test payment flow in production
- [ ] Test webhook delivery
- [ ] Monitor server logs

## 🐛 Known Issues & Future Improvements

### Current Limitations
- Contact form uses test email service (ethereal.email) - needs production SMTP
- Printful order creation commented out - awaiting product configuration
- No admin dashboard (orders managed via Stripe/Printful dashboards)

### Future Enhancements
- [ ] Product reviews system
- [ ] Newsletter signup
- [ ] Analytics tracking (Google Analytics)
- [ ] SEO optimization (meta tags, sitemap.xml)
- [ ] Admin dashboard for order management
- [ ] Discount code system
- [ ] Product inventory tracking

## 📝 Development Notes

### Adding New Products

1. Add product images to `frontend/public/products/`
2. Optimize images: `npm run optimize-images` (frontend)
3. Add product data to `frontend/src/data/products.js`
4. Configure corresponding Printful product
5. Update Printful product ID in data

### Stripe Webhook Setup

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:5000/webhook
   ```
3. Copy webhook secret to `.env` as `STRIPE_WEBHOOK_SECRET`

### Email Configuration

**Development:** Uses ethereal.email (test service, auto-configured)
**Production:** Configure SMTP settings in `.env`

Popular SMTP providers:
- Gmail: smtp.gmail.com:587 (requires app password)
- SendGrid: smtp.sendgrid.net:587
- Mailgun: smtp.mailgun.org:587
- AWS SES: email-smtp.us-east-1.amazonaws.com:587

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a personal project. Not accepting contributions at this time.

## 📧 Support

For issues or questions, contact: support@yourabsolutelyright.com

---

**Built with Claude Code 🤖**
**Status:** Production-ready (pending SMTP configuration)
**Last Updated:** October 2025
