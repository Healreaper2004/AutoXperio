async function loadInventory() {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = 'homepage.html';

  try {
    const res = await fetch('http://localhost:5000/api/inventory', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const parts = await res.json();
    const tbody = document.querySelector('.inventory-table tbody');
    tbody.innerHTML = '';
    parts.forEach(part => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><div class="part-name">${part.name}</div><div class="part-code">${part.code}</div></td>
        <td>${part.category}</td>
        <td>${part.quantity}</td>
        <td>$${part.unitPrice}</td>
        <td><span class="status ${part.quantity == 0 ? 'out-stock' : part.quantity < 10 ? 'low-stock' : 'in-stock'}">
          ${part.quantity == 0 ? 'Out of Stock' : part.quantity < 10 ? 'Low Stock' : 'In Stock'}</span></td>
        <td>
          <a href="#" title="Edit">✎</a>
          <a href="#" title="Delete">🗑️</a>
        </td>`;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Failed to load inventory:', err);
  }
}

if (window.location.pathname.includes('inventory.html')) loadInventory();
