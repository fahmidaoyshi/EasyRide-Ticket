const seatGrid = document.getElementById("seatGrid");
const seatCount = document.getElementById("seatCount");
const selectedSeatsTable = document.getElementById("selected-seats-table");
const totalPriceEl = document.getElementById("total-price");
const discountContainer = document.getElementById("discount-container");
const discountPriceEl = document.getElementById("discount-price");
const grandTotalEl = document.getElementById("grand-total");
const applyBtn = document.getElementById("apply-btn");
const couponInput = document.getElementById("coupon-code");
const nextBtn = document.getElementById("next-btn");
const nameInput = document.getElementById("passenger-name");
const phoneInput = document.getElementById("phone-number");

const SEAT_PRICE = 550;
let selectedSeats = [];
let bookedSeats = [];
let discount = 0;

const rows = ["A","B","C","D","E","F","G","H","I","J"];

/* ===== Generate Seats ===== */
rows.forEach(row => {
  for (let i = 1; i <= 4; i++) {
    const seat = `${row}${i}`;
    const btn = document.createElement("button");
    btn.innerText = seat;
    btn.className = "btn btn-sm bg-green-400";
    btn.onclick = () => toggleSeat(seat, btn);
    seatGrid.appendChild(btn);
  }
});

function toggleSeat(seat, btn) {
  if (bookedSeats.includes(seat)) {
    bookedModal.showModal();
    return;
  }

  if (selectedSeats.includes(seat)) {
    selectedSeats = selectedSeats.filter(s => s !== seat);
    btn.className = "btn btn-sm bg-green-400";
  } else {
    selectedSeats.push(seat);
    btn.className = "btn btn-sm bg-gray-400";
  }
  updateUI();
}


/* ===== Update UI ===== */
function updateUI() {
  seatCount.innerText = selectedSeats.length;

  // Update table
  selectedSeatsTable.innerHTML = selectedSeats.map(s => `
    <tr>
      <td>${s}</td>
      <td class="text-center">Economy</td>
      <td class="text-right">${SEAT_PRICE}</td>
    </tr>`).join("");

  // Total & discount
  const total = selectedSeats.length * SEAT_PRICE;
  totalPriceEl.innerText = total - discount;
  discountPriceEl.innerText = discount;
  discountContainer.style.display = discount > 0 ? "flex" : "none";

  // Grand Total
  grandTotalEl.innerText = total - discount;

  // Enable Next button
  nextBtn.disabled = !(selectedSeats.length > 0 && nameInput.value && phoneInput.value);

  // Enable Apply button if >=2 seats
  applyBtn.disabled = selectedSeats.length < 2;
}

nameInput.addEventListener("input", updateUI);
phoneInput.addEventListener("input", updateUI);

/* ===== Coupon ===== */
applyBtn.onclick = () => {
  const code = couponInput.value.trim();
  if (selectedSeats.length < 2) return alert("Minimum 2 seats required");

  if (code === "NEW15") discount = 0.15 * selectedSeats.length * SEAT_PRICE;
  else if (code === "COUPLE20") discount = 0.2 * selectedSeats.length * SEAT_PRICE;
  else return alert("Wrong coupon");

  updateUI();
  alert("Coupon applied!");
};

/* ===== Confirm / Next ===== */
nextBtn.onclick = () => {
  bookedSeats.push(...selectedSeats);
  selectedSeats = [];
  discount = 0;
  couponInput.value = "";
  updateUI();
  alert("Booking Successful!");
};
// Success Modal
nextBtn.addEventListener("click", function() {
    successModal.classList.remove("hidden");
    successModal.classList.add("flex");
});