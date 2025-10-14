// Verify which Stripe mode you're in (test vs live)

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function verifyStripeMode() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

  console.log('\n🔍 Stripe Configuration Check\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Check secret key
  if (!secretKey) {
    console.error('❌ STRIPE_SECRET_KEY not found in .env');
    process.exit(1);
  }

  if (secretKey.startsWith('sk_test_')) {
    console.log('🧪 Mode: TEST MODE');
    console.log('   Secret Key: sk_test_****' + secretKey.slice(-10));
  } else if (secretKey.startsWith('sk_live_')) {
    console.log('🔴 Mode: LIVE MODE (Production)');
    console.log('   Secret Key: sk_live_****' + secretKey.slice(-10));
  } else {
    console.error('❌ Invalid secret key format');
    process.exit(1);
  }

  // Check publishable key
  if (publishableKey) {
    if (publishableKey.startsWith('pk_test_')) {
      console.log('   Publishable: pk_test_****' + publishableKey.slice(-10));
    } else if (publishableKey.startsWith('pk_live_')) {
      console.log('   Publishable: pk_live_****' + publishableKey.slice(-10));
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Test API connection
  try {
    const balance = await stripe.balance.retrieve();
    console.log('✅ Stripe API Connection: SUCCESS');
    console.log('   Available Balance: $' + (balance.available[0]?.amount / 100 || 0));
    console.log('   Pending Balance: $' + (balance.pending[0]?.amount / 100 || 0));
    console.log('   Currency:', balance.available[0]?.currency?.toUpperCase() || 'USD');
  } catch (error) {
    console.error('❌ Stripe API Connection: FAILED');
    console.error('   Error:', error.message);
    process.exit(1);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Check for CLAUDE30 coupon
  try {
    const coupon = await stripe.coupons.retrieve('CLAUDE30');
    console.log('🎟️  CLAUDE30 Coupon: EXISTS');
    console.log('   Discount: ' + coupon.percent_off + '%');
    console.log('   Duration: ' + coupon.duration);
    console.log('   Valid: ' + (coupon.valid ? 'Yes' : 'No'));
  } catch (error) {
    if (error.code === 'resource_missing') {
      console.log('⚠️  CLAUDE30 Coupon: NOT FOUND');
      console.log('   Run: node create-live-coupon.js');
    } else {
      console.error('❌ Error checking coupon:', error.message);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

verifyStripeMode();
