<div align="center">
  <img src="frontend/public/images/hero-logo.png" alt="You're Absolutely Right" width="400"/>

  <h1>You're Absolutely Right.</h1>

  <p><strong>Merch for when Claude validates your existence.</strong></p>

  <p>
    <a href="https://yourabsolutelyright.com">🛍️ Visit Store</a> •
    <a href="#-why-this-exists">Why Though?</a> •
    <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
    <a href="#-for-developers">For Developers</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Built_with-Claude_Code-E67E5E?style=for-the-badge" alt="Built with Claude Code"/>
    <img src="https://img.shields.io/badge/Vibes-Absolutely_Right-F4F3EE?style=for-the-badge" alt="Vibes: Absolutely Right"/>
  </p>
</div>

---

## 🤖 What Is This?

Ever notice how Claude AI always says **"You're absolutely right"** before gently correcting you?

Yeah, we did too.

So we made merch about it. Because sometimes you need a mug that validates you, even when you're wrong.

### Products Include:
- **Hoodies** for those absolutely right moments
- **Mugs** to take your correct attitude on the go
- **Flip-flops** to walk confidently knowing you're right
- **Backpacks** to carry everything with absolute confidence
- **Mousepads** because you're right to upgrade your desk
- And more absolutely right accessories

---

## 💡 Why This Exists

Look, we're not here to change the world. We're here to put "You're absolutely right" on things you can buy.

That's it. That's the business model.

**The Timeline:**
1. Started as a joke
2. Became a website
3. Now it's a real store selling real products
4. You're absolutely right to be here

---

## 🎨 The Vibe

This site matches Claude's aesthetic:
- **Warm, aged paper backgrounds** (#F4F3EE)
- **Coral accent colors** from the Claude logo
- **Clean typography** with personality
- **Minimalist but cozy** design
- **Humor in the content**, not flashy design

Built with the same thoughtful care Claude puts into every response. Except we're selling hoodies.

---

## 🏗️ Tech Stack

### Frontend
- **React 19** - Because we're modern like that
- **React Router** - For those sweet page transitions
- **Custom CSS** - No frameworks, just vibes
- **Vercel** - Deployed faster than Claude can say "absolutely right"

### Backend
- **Node.js + Express** - Classic and reliable
- **Stripe API** - Secure payments (we don't see your card)
- **Printful API** - Print-on-demand (we don't run a warehouse)
- **Railway** - Backend hosting

### Security Features
- Rate limiting (100 req/15min)
- Stripe webhook verification
- Input validation on everything
- CORS configured properly
- No secrets in git (we checked twice)

---

## 🚀 For Developers

### Why You Should Fork This:

✅ **Production-ready e-commerce stack**
- Fully functional Stripe integration
- Printful fulfillment automation
- Product catalog with variant support
- Coupon system included

✅ **Clean, modern codebase**
- Well-organized component structure
- Responsive design patterns
- Reusable utility functions
- Security best practices built-in

✅ **Actually makes money**
- Real payments processing
- Automated order fulfillment
- Customer email notifications
- No inventory management needed

### Quick Start

```bash
# Clone the repo
git clone https://github.com/PedroMesaJr/yourabsolutelyright.git
cd yourabsolutelyright

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Set up environment variables (see below)

# Run locally
cd backend && npm start      # Backend: http://localhost:5000
cd frontend && npm start     # Frontend: http://localhost:3000
```

### Environment Setup

**Backend** (`backend/.env`):
```env
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
PRINTFUL_API_KEY=your_printful_key
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env`):
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

See `.env.example` files for full reference.

---

## 📦 Project Structure

```
yourabsolutelyright/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Page-level components
│   │   ├── styles/          # CSS modules (old raggedy aesthetic)
│   │   ├── data/            # Product catalog
│   │   └── utils/           # Stripe helpers, utilities
│   └── public/              # Images, static assets
│
├── backend/
│   ├── routes/              # API endpoints (stripe, printful, contact)
│   ├── controllers/         # Business logic
│   └── server.js           # Express app with security middleware
│
├── Mockups/                 # Product mockup images
└── design-inspiration/      # Design references & tokens
```

---

## 🛠️ Features

### For Customers:
- 🖼️ **Image galleries** with zoom functionality
- 📱 **Responsive design** - looks great on all devices
- 💳 **Stripe Checkout** - secure, trusted payment flow
- 🎟️ **Coupon codes** - discount support (`CLAUDE30` for 30% off)
- 📦 **Size variants** - select sizes for apparel
- ✉️ **Order confirmations** - automatic email notifications

### For Developers:
- 🔒 **Security-first** - rate limiting, input validation, webhook verification
- 🚀 **Easy deployment** - Vercel + Railway ready
- 📝 **Well-documented** - comments explain the why, not just the what
- 🎨 **Design system** - reusable color tokens and spacing
- 🧪 **Production-tested** - this site actually sells products

---

## 🔐 Security

We take security seriously (even if we joke about everything else):

- ✅ Environment variables for all secrets
- ✅ Stripe webhook signature verification
- ✅ Rate limiting on payment endpoints (10 req/15min)
- ✅ Input validation on all API calls
- ✅ CORS properly configured
- ✅ No API keys committed to git
- ✅ Security audit passed (see `docs-internal/`)

---

## 📈 Why Open Source?

**Because you're absolutely right to learn from working code.**

This isn't a tutorial. This isn't a starter template. This is a **real, working e-commerce site** that processes real payments and ships real products.

Use it to:
- Learn modern React patterns
- Understand Stripe integration
- See production security practices
- Build your own merch store
- Launch your meme-based business empire

We built this with Claude Code. You can too.

---

## 🎯 Use Cases

Fork this if you want to sell:
- Band merch
- Podcast swag
- YouTuber merchandise
- Meme products
- Community gear
- Literally anything on Printful's catalog

Just swap the products and colors. The infrastructure is solid.

---

## 🤝 Contributing

Found a bug? Have a feature idea? Want to improve the copy?

1. Fork the repo
2. Make your changes
3. Submit a PR
4. We'll probably merge it

**Guidelines:**
- Keep the vibe (casual, funny, honest)
- Maintain security standards
- Test your changes locally
- No `console.log()` in production code

---

## 📝 License

**MIT License** - Do whatever you want with this code.

Build your own store. Copy the design. Steal the jokes. We're not precious about it.

Just don't claim you invented the phrase "You're absolutely right." Claude said it first.

---

## 💬 The Fine Print

This site is:
- ✅ Not affiliated with Anthropic
- ✅ Not endorsed by Claude AI
- ✅ Just a funny merch store
- ✅ Actually functional though

If Anthropic asks us to take it down, we probably will. Until then, we're vibing.

---

## 🔗 Links

- **Live Site:** [yourabsolutelyright.com](https://yourabsolutelyright.com)
- **Issues:** [Report bugs](https://github.com/PedroMesaJr/yourabsolutelyright/issues)
- **Contact:** support@yourabsolutelyright.com

---

<div align="center">
  <h3>Built with Claude Code 🤖</h3>
  <p>Because of course it was.</p>

  <p><strong>You're absolutely right to check out the code. ✨</strong></p>

  <br/>

  <p>
    <a href="https://yourabsolutelyright.com">Visit Store</a> •
    <a href="https://github.com/PedroMesaJr/yourabsolutelyright/issues">Report Issue</a> •
    <a href="#%EF%B8%8F-tech-stack">Tech Docs</a>
  </p>

  <br/>

  <sub>Made with ❤️ for the AI community</sub>
</div>
