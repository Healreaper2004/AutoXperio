// ✅ Summary Cards
async function loadDashboardStats() {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = 'homepage.html';

  try {
    const res = await fetch('http://localhost:5000/api/dashboard/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const stats = await res.json();

    const cards = document.querySelectorAll('.card');
    cards[0].querySelector('.card-value').innerText = stats.services;
    cards[1].querySelector('.card-value').innerText = `$${stats.revenue.toLocaleString()}`;
    cards[2].querySelector('.card-value').innerText = stats.inventory;
    cards[3].querySelector('.card-value').innerText = stats.bookings;
    cards[3].querySelector('.card-sub').innerText = `Today's: ${stats.todayAppointments} appointments`;
  } catch (err) {
    console.error('❌ Failed to load dashboard stats:', err);
  }
}

// ✅ Recent Activity Feed
async function loadRecentActivity() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch("http://localhost:5000/api/dashboard/activity", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    const list = document.querySelector(".recent-activity ul");
    list.innerHTML = "";

    data.forEach(activity => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="dot"></span> ${activity.message} <span class="time">${activity.timeAgo}</span>`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("❌ Failed to load activity:", err);
  }
}

// ✅ Part Usage Pie Chart (Placeholder)
async function loadPartUsageChart() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch("http://localhost:5000/api/dashboard/part-usage", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    console.log("🥧 Part Usage Data:", data);
    // TODO: Render chart with Chart.js or similar
  } catch (err) {
    console.error("❌ Part usage fetch error:", err);
  }
}

// ✅ Service Frequency Bar Chart (Placeholder)
async function loadServiceFrequencyChart() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch("http://localhost:5000/api/dashboard/service-frequency", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    console.log("📊 Service Frequency:", data);
    // TODO: Render chart with Chart.js or similar
  } catch (err) {
    console.error("❌ Service frequency fetch error:", err);
  }
}

// ✅ CSV Export Function
function exportToCSV(data, filename) {
  if (!data || !data.length) return alert("No data to export.");
  const csv = [
    Object.keys(data[0]).join(','),
    ...data.map(row => Object.values(row).join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

// ✅ Bind Events & Load All
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("dashboard.html")) {
    loadDashboardStats();
    loadRecentActivity();
    loadPartUsageChart();
    loadServiceFrequencyChart();

    document.querySelector(".export-btn").addEventListener("click", async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/dashboard/part-usage", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      exportToCSV(data, "part-usage.csv");
    });
  }
});
