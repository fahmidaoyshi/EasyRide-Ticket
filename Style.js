document.addEventListener("DOMContentLoaded", () => {

  const seatGrid = document.getElementById("seatGrid");
  const seatCount = document.getElementById("seatCount");
  const selectedSeatsTable = document.getElementById("selected-seats-table");
  const totalPriceEl = document.getElementById("total-price");
  const discountContainer = document.getElementById("discount-container");
  const discountPriceEl = document.getElementById("discount-price");
  const grandTotalEl = document.getElementById("grand-total");
  const applyBtn = document.getElementById("apply-btn");
  const couponInput = document.getElementById("coupon-code");
  const couponMsg = document.getElementById("coupon-msg");
  const nextBtn = document.getElementById("next-btn");
  const nameInput = document.getElementById("passenger-name");
  const phoneInput = document.getElementById("phone-number");
  const emailInput = document.getElementById("email");
  const successModal = document.getElementById("successModal");
  const bookedModal = document.getElementById("bookedModal");
  const continueBtn = document.getElementById("continue-btn");
  const busBtn = document.getElementById("busBtn");
  const paribahan = document.getElementById("paribahan");
  const seatLeftEl = document.getElementById("seatLeft");

  const SEAT_PRICE = 550;
  const TOTAL_SEATS = 40;

  let selectedSeats = [];
  let bookedSeats = [];
  let discount = 0;

  const rows = ["A","B","C","D","E","F","G","H","I","J"];

  /* ===== Generate Seats ===== */
  rows.forEach(row => {
    const label = document.createElement("div");
    label.innerText = row;
    label.className = "font-bold";
    seatGrid.appendChild(label);

    for (let i = 1; i <= 4; i++) {
      const seat = `${row}${i}`;
      const btn = document.createElement("button");
      btn.innerText = seat;
      btn.className = "btn btn-sm bg-green-400";
      btn.onclick = () => toggleSeat(seat, btn);
      seatGrid.appendChild(btn);
    }
  });

  /* ===== Seat Toggle (ONLY ONE FUNCTION) ===== */
  function toggleSeat(seat, btn){
    if(bookedSeats.includes(seat)){
      bookedModal.showModal();
      return;
    }
    if(selectedSeats.includes(seat)){
      selectedSeats = selectedSeats.filter(s => s !== seat);
      btn.className = "btn btn-sm bg-green-400";
    }else{
      selectedSeats.push(seat);
      btn.className = "btn btn-sm bg-gray-400";
    }
    updateUI();
  }

  /* ===== Update UI ===== */
  function updateUI(){
    seatCount.innerText = selectedSeats.length;

    selectedSeatsTable.innerHTML = selectedSeats.map(seat => `
      <tr>
        <td>${seat}</td>
        <td class="text-center">Economy</td>
        <td class="text-right">${SEAT_PRICE}</td>
      </tr>
    `).join("");

    const total = selectedSeats.length * SEAT_PRICE;

    totalPriceEl.innerText = total - discount;
    discountPriceEl.innerText = discount;
    discountContainer.style.display = discount > 0 ? "flex" : "none";
    grandTotalEl.innerText = total - discount;

    nextBtn.disabled = !(selectedSeats.length > 0 && nameInput.value && phoneInput.value);
    applyBtn.disabled = selectedSeats.length < 2;

    seatLeftEl.innerText =
      (TOTAL_SEATS - bookedSeats.length - selectedSeats.length) + " Seats Left";
  }

  /* ===== Inputs ===== */
  [nameInput, phoneInput, emailInput].forEach(inp =>
    inp.addEventListener("input", updateUI)
  );

  /* ===== Coupon ===== */
  applyBtn.onclick = () => {
    const code = couponInput.value.trim();

    if(code === "NEW15") discount = 0.15 * selectedSeats.length * SEAT_PRICE;
    else if(code === "COUPLE20") discount = 0.2 * selectedSeats.length * SEAT_PRICE;
    else{
      couponMsg.innerText = "Wrong coupon code!";
      couponMsg.classList.remove("hidden");
      discount = 0;
      updateUI();
      return;
    }

    couponMsg.classList.add("hidden");
    updateUI();
    alert("Coupon Applied!");
  };

  /* ===== Confirm Booking ===== */
  nextBtn.onclick = () => {
    bookedSeats.push(...selectedSeats);
    selectedSeats = [];
    discount = 0;
    couponInput.value = "";
    updateUI();
    successModal.classList.add("modal-open");
  };

  continueBtn.onclick = () => {
    successModal.classList.remove("modal-open");
  };

  /* ===== Scroll ===== */
  busBtn.onclick = () => {
    paribahan.scrollIntoView({ behavior: "smooth" });
  };

});
