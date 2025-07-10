// 📁 frontend/js/billing.js

async function fetchLatestBill() {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/billing/latest', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) {
      // Populate bill dynamically - example:
      document.querySelector('.invoice-number').innerText = `Invoice #${data.invoiceNumber}`;
      document.querySelector('.user-name').innerText = data.ownerName;
      // ...more population code
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error('Error fetching bill:', err);
  }
}

if (window.location.pathname.includes('billing.html')) fetchLatestBill();