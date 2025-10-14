// Run this ONCE after switching to Stripe live mode
// Creates CLAUDE30 coupon in production

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createLiveCoupon() {
  try {
    console.log('🎟️  Creating CLAUDE30 coupon in Stripe...\n');

    // Check if coupon already exists
    try {
      const existing = await stripe.coupons.retrieve('CLAUDE30');
      console.log('⚠️  Coupon CLAUDE30 already exists!');
      console.log('   ID:', existing.id);
      console.log('   Discount:', existing.percent_off + '%');
      console.log('   Duration:', existing.duration);
      console.log('   Valid:', existing.valid);
      console.log('\n✅ No action needed - coupon is ready to use!');
      return;
    } catch (error) {
      // Coupon doesn't exist, create it
      if (error.code === 'resource_missing') {
        console.log('ℹ️  Coupon does not exist yet, creating...\n');
      } else {
        throw error;
      }
    }

    // Create the coupon
    const coupon = await stripe.coupons.create({
      id: 'CLAUDE30',
      percent_off: 30,
      duration: 'forever',
      name: 'Claude Code 30% Off',
    });

    console.log('✅ Live coupon created successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Coupon ID:      ', coupon.id);
    console.log('Discount:       ', coupon.percent_off + '%');
    console.log('Duration:       ', coupon.duration);
    console.log('Name:           ', coupon.name);
    console.log('Valid:          ', coupon.valid);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🎉 Customers can now use code: CLAUDE30');
  } catch (error) {
    console.error('❌ Error creating coupon:', error.message);
    if (error.type) {
      console.error('   Error type:', error.type);
    }
    process.exit(1);
  }
}

createLiveCoupon();
