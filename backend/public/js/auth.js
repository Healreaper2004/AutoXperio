// // 🔐 Redirect to login if not authenticated (except on homepage)
// document.addEventListener("DOMContentLoaded", () => {
//   const pathname = window.location.pathname;

//   // Only redirect if not homepage and no token
//   if (!localStorage.getItem('token') && !pathname.includes('homepage.html')) {
//     window.location.href = 'homepage.html';
//   }
// });

// ✅ Toast system (inline notifications)
function showToast(message, type = 'info') {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    background: ${type === "error" ? "#f44336" : "#4CAF50"};
    color: white;
    padding: 12px 18px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    animation: fadeout 2.5s ease forwards;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ✅ Toggle role button active state
const roleButtons = document.querySelectorAll('.role-btn');
roleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    roleButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ✅ Handle login form submit
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const roleBtn = document.querySelector('.role-btn.active');
    const role = roleBtn ? roleBtn.textContent.toLowerCase() : '';

    if (!role) {
      showToast("Please select a role.", "error");
      return;
    }

    try {
      const res = await fetch('https://autoxperio.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role); // ✅ Save backend-confirmed role

        showToast("Login successful!", "success");

        // Redirect based on backend-confirmed role
        if (data.role === 'owner') {
          window.location.href = 'dashboard.html';
        } else if (data.role === 'customer') {
          window.location.href = 'serviceBookingPortal.html';
        } else {
          showToast("Unknown role. Access denied.", "error");
          localStorage.clear();
        }

      } else {
        showToast(data.message || 'Login failed.', 'error');
      }
    } catch (err) {
      console.error('Login error:', err);
      showToast('Server error. Try again later.', 'error');
    }
  });
}

// ✅ Global logout handler
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = 'homepage.html';
}
window.logout = logout;
