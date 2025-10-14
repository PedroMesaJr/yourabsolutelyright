// Quick test script for contact form API
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testContactForm() {
  console.log('Testing contact form endpoint...\n');

  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'general-question',
    message: 'This is a test message to verify the contact form is working correctly.',
    orderNumber: ''
  };

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const data = await response.json();

    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✅ Contact form test PASSED!');
      console.log('Check the server logs for email preview URL (ethereal.email)');
    } else {
      console.log('\n❌ Contact form test FAILED!');
    }
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

testContactForm();
