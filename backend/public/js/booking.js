document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.querySelector("#booking-form");
  const bookingsTableBody = document.getElementById("bookingsTableBody");
  const token = localStorage.getItem("token");
  let userRole = "customer"; // default

  // Auth redirect fallback
  if (!token) window.location.href = "homepage.html";

  // Fetch user info and set role
  fetch("http://localhost:5000/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      document.querySelector(".user-name").textContent = data.username;
      document.querySelector(".user-role").textContent = data.role;
      userRole = data.role;
      loadBookings();
    })
    .catch(err => {
      console.error("Failed to fetch user info:", err);
      window.location.href = "homepage.html";
    });

  // Load bookings
  function loadBookings() {
    fetch("http://localhost:5000/api/bookings")
      .then(res => res.json())
      .then(data => {
        bookingsTableBody.innerHTML = "";
        data.forEach(booking => {
          const row = document.createElement("tr");

          const statusSpan = `<span class="status ${booking.status.toLowerCase().replace(" ", "-")}">${booking.status}</span>`;
          const editBtn = `<a href="#" title="Edit" onclick="openStatusEditor('${booking._id}', '${booking.status}')">✏️</a>`;
          const viewBtn = `<a href="#" title="View">👁️</a>`;

          row.innerHTML = `
            <td>#SB-${booking.bookingId}</td>
            <td>${booking.vehicleNumber}</td>
            <td>${booking.serviceType}</td>
            <td>${new Date(booking.preferredDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</td>
            <td>${statusSpan}</td>
            <td>
              ${userRole === "owner" ? editBtn : ""}
              ${viewBtn}
            </td>
          `;

          bookingsTableBody.appendChild(row);
        });
      })
      .catch(err => {
        console.error("Error loading bookings:", err);
      });
  }

  // Load stats
  fetch("http://localhost:5000/api/bookings/stats")
    .then(res => res.json())
    .then(stats => {
      document.getElementById("totalBookingsStat").textContent = stats.totalBookings;
      document.getElementById("pendingBookingsStat").textContent = stats.pendingBookings;
      document.getElementById("completedBookingsStat").textContent = stats.completedBookings;
    })
    .catch(err => {
      console.error("Error loading stats:", err);
    });

  // Submit new booking
  bookingForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const newBooking = {
      vehicleNumber: document.getElementById("vehicleNumber").value,
      serviceType: document.getElementById("serviceType").value,
      preferredDate: document.getElementById("preferredDate").value,
      preferredTime: document.getElementById("preferredTime").value,
      issueDescription: document.getElementById("issueDescription").value
    };

    fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newBooking)
    })
      .then(res => res.json())
      .then(data => {
        alert("Service booking saved successfully!");
        location.reload();
      })
      .catch(err => {
        alert("Booking failed.");
        console.error(err);
      });
  });

  // Modal functions
  window.openStatusEditor = function (bookingId, currentStatus) {
    window.selectedBookingId = bookingId;
    document.getElementById("statusSelect").value = currentStatus;
    document.getElementById("statusModal").style.display = "block";
  };

  window.closeStatusModal = function () {
    window.selectedBookingId = "";
    document.getElementById("statusModal").style.display = "none";
  };

  window.updateStatus = function () {
    const newStatus = document.getElementById("statusSelect").value;

    fetch(`http://localhost:5000/api/bookings/${window.selectedBookingId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        alert("Status updated successfully!");
        closeStatusModal();
        loadBookings();
      })
      .catch(err => {
        console.error("Error updating status:", err);
        alert("Failed to update booking status.");
      });
  };
});
