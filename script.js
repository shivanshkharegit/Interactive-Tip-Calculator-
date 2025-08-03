const billInput = document.getElementById("bill-input");
const tipInput = document.getElementById("tip-input");
const peopleInput = document.getElementById("people-input");
const tipButtons = document.querySelectorAll(".btn");
const tipHeading = document.getElementById("tip");
const totalHeading = document.getElementById("total");
const errorLabel = document.getElementById("error-label");
const resetBtn = document.getElementById("reset")

let bill = 0;
let tip = 0;
let people = 0;

resetBtn.addEventListener("click", () => {
  billInput.value = ""
  tipInput.value = ""
  peopleInput.value = ""
  tipHeading.innerText = "0.00"
  totalHeading.innerText = "0.00"
  tipButtons.forEach(btn => btn.classList.remove("btn-active"))
})

function calculate() {
  const billAmount = parseFloat(bill) || 0;
  const tipPercent = parseFloat(tip) || 0;
  const noPeople = parseInt(people) || 0;

  if (noPeople <= 0) {
    return;
  }

  const tipPerPerson = (billAmount * tipPercent) / 100 / noPeople;
  const totalPerPerson = billAmount / noPeople + tipPerPerson;

  const finalTip = tipPerPerson.toFixed(2);
  const finalAmount = totalPerPerson.toFixed(2);

  tipHeading.innerText = finalTip;
  totalHeading.innerText = finalAmount;
}

function initialize() {
  billInput.addEventListener("input", () => {
    bill = billInput.value;
    calculate();
  });

  tipInput.addEventListener("input", () => {
    tip = tipInput.value;
    calculate();
  });

  peopleInput.addEventListener("input", () => {
    people = peopleInput.value;
    if(people <=0 ) {
      console.log("it can't be zero or less!");
      peopleInput.classList.add("error");
      errorLabel.classList.toggle("hidden");
    } else {
      calculate();
    }
  });

  tipButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tip = btn.id.split("-")[1];
      tipButtons.forEach((btn) => btn.classList.remove("btn-active"));
      btn.classList.add("btn-active");
      calculate();
    });
  });
}

initialize();