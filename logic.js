const btns = document.querySelector(".tip-buttons");
let selectedTip = 0;

//creating the tip selectors btns
function createTipSelectors() {
  for (let [index, value] of tipPercentages.entries()) {
    let btn = document.createElement("BUTTON");
    btn.innerText = value;
    btn.setAttribute("id", `btn${index + 1}`);
    btn.classList.add("btn", "btn-primary");
    btns.appendChild(btn);
  }
}

//getting the tip selected by user
function getSelectedTip() {
  btns.addEventListener("click", (e) => {
    let selectedBtnId = e.target.id;
    selectedTip = parseInt(e.target.innerText);

    //add the selectedBtn class to the current element being selected and remove from other elements if present - highlight the selected tip
    document.getElementById(selectedBtnId).classList.add("selectedBtn");
    for (let item of btns.children) {
      if (item.id != selectedBtnId && item.classList.contains("selectedBtn")) {
        item.classList.remove("selectedBtn");
      }
    }
  });
}

//triggered when user clicks on reset form 
function resetForm() {
  document.querySelector("#tip-calculator-form").reset();
  clearErrors();
  for (let item of btns.children) {
    item.classList.remove("selectedBtn");
    item.value = 0;
  }
  selectedTip = 0;
  document.querySelector(".tip-info1-value").innerHTML = 0;
  document.querySelector(".total-info2-value").innerHTML = 0;
}

//calculate totals and show to user on screen
function calculateTotalTip(isFormValidated, ftotalBill, ftotalPeople) {
  if (isFormValidated) {
    //calcuate the totals else let it remain to 0
    let tipPerPerson = 0;
    let totalPerPerson = 0;
    let totalTip = (selectedTip / 100) * ftotalBill;
    tipPerPerson = totalTip / ftotalPeople;
    totalPerPerson = ftotalBill / ftotalPeople;

    document.querySelector(".tip-info1-value").innerHTML = tipPerPerson;
    document.querySelector(".total-info2-value").innerHTML = totalPerPerson;
  } else {
    document.querySelector(".tip-info1-value").innerHTML = 0;
    document.querySelector(".total-info2-value").innerHTML = 0;
  }
}


//helper function for clearing errors as resolved by user
function clearErrors() {
  let errors = document.getElementsByClassName("form-error");
  for (let item of errors) {
    item.innerText = "";
  }
}

//used to set different error messages for inputs 
function setErrors(id, error) {
  let element = document.getElementById(id);
  element.getElementsByClassName("form-error")[0].innerText = error;
}

//form validation when user submits the form 
function validateForm(e) {
  e.preventDefault();   //prevents page reload 
  let returnValue = true;
  clearErrors(); 

  let form = document.querySelector("#tip-calculator-form");
  let inputBill = form["bill"];
  let totalPeopleInput = form["number-of-people"];

  if (inputBill.value <= 0) {
    setErrors("fbill", "Please enter amount greater than 0.");
    returnValue = false;
  }
  if (inputBill.value > 10000) {
    setErrors(
      "fbill",
      "Accepting amount till 10K only.Please enter valid amount."
    );
    returnValue = false;
  }
  if (selectedTip == 0) {
    setErrors("tip-buttons-form", "Please select a tip value.");
    returnValue = false;
  }
  if (totalPeopleInput.value <= 0) {
    setErrors("ftotal-people", "Number of people cannot be 0 or negative.");
    returnValue = false;
  }

  calculateTotalTip(returnValue, inputBill.value, totalPeopleInput.value);
  return returnValue;
}

const tipPercentages = ["5%", "10%", "15%", "25%", "50%"];

createTipSelectors();
getSelectedTip();
