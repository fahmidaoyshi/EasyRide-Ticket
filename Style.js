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

const SEAT_PRICE = 550;
let selectedSeats = [];
let bookedSeats = [];
let discount = 0;

seats.forEach(seat => {
  seat.className =
    "seat btn btn-sm w-12 bg-[#F7F8F8] text-gray-600 rounded-lg";

  seat.addEventListener("click", () => {
    const seatName = seat.innerText;

    if (seat.classList.contains("bg-green-500")) {
      // unselect
      seat.classList.remove("bg-green-500", "text-white");
      seat.classList.add("bg-[#F7F8F8]", "text-gray-600");
      selectedSeats = selectedSeats.filter(s => s !== seatName);
    } else {
      // select
      seat.classList.remove("bg-[#F7F8F8]", "text-gray-600");
      seat.classList.add("bg-green-500", "text-white");
      selectedSeats.push(seatName);
    }

    seatCount.innerText = selectedSeats.length;
  });
});

const seatLeftEl = document.getElementById("seatLeft");
let TOTAL_SEATS = 40; 

// Toggle seat selection
function toggleSeat(seat, btn){
  if(bookedSeats.includes(seat)){
    bookedModal.showModal();
    return;
  }
  if(selectedSeats.includes(seat)){
    selectedSeats = selectedSeats.filter(s=>s!==seat);
    btn.className = "btn btn-md bg-green-400";
  }else{
    selectedSeats.push(seat);
    btn.className = "btn btn-md bg-gray-400";
  }
  updateUI();
}

// Update UI
function updateUI(){
  seatCount.innerText = selectedSeats.length;
  selectedSeatsTable.innerHTML = selectedSeats.map(s=>
    `<tr>
      <td>${s}</td>
      <td class="text-center">Economy</td>
      <td class="text-right">${SEAT_PRICE}</td>
    </tr>`).join("");

  const total = selectedSeats.length * SEAT_PRICE;
  totalPriceEl.innerText = total - discount;
  discountPriceEl.innerText = discount;
  discountContainer.style.display = discount>0 ? "flex":"none";
  grandTotalEl.innerText = total - discount;

  // Next button validation
  nextBtn.disabled = !(selectedSeats.length>0 && nameInput.value && phoneInput.value);

  // Coupon validation
  applyBtn.disabled = selectedSeats.length<2;

  seatLeftEl.innerText =
  (TOTAL_SEATS - bookedSeats.length - selectedSeats.length)
  + " Seats Left";
}

// Inputs
[nameInput,phoneInput,emailInput].forEach(inp=>inp.addEventListener("input",updateUI));

// Coupon apply
applyBtn.onclick = ()=>{
  const code = couponInput.value.trim();
  if(selectedSeats.length<2){
    couponMsg.innerText = "Select at least 2 seats for coupon";
    couponMsg.classList.remove("hidden");
    return;
  }
  if(code==="NEW15") discount = 0.15 * selectedSeats.length * SEAT_PRICE;
  else if(code==="COUPLE20") discount = 0.2 * selectedSeats.length * SEAT_PRICE;
  else{
    couponMsg.innerText = "Wrong coupon code!";
    couponMsg.classList.remove("hidden");
    discount=0;
    updateUI();
    return;
  }
  couponMsg.classList.add("hidden");
  updateUI();
  alert("Coupon Applied!");
};

// Confirm Booking
nextBtn.onclick = ()=>{
 bookedSeats.push(...selectedSeats);
  selectedSeats = [];
  discount = 0;
  couponInput.value="";
  updateUI();
  successModal.classList.add("modal-open");
};

// Continue Modal
continueBtn.onclick = ()=>{
  successModal.classList.remove("modal-open");
};
