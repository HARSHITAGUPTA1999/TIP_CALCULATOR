



// document.querySelector(".tip-buttons #btn1").addEventListener("click", (e) => {
//   selectedTip = parseInt(e.target.innerText);
//   console.log(selectedTip);
// });
const btns = document.querySelector(".tip-buttons");
    let selectedTip = 0;
    btns.addEventListener("click", (e) => {
        console.log(e.target.id);
        let selectedBtnId = e.target.id;
        selectedTip = parseInt(e.target.innerText);
        document.getElementById(selectedBtnId).classList.add("selectedBtn");
        //add the selectedBtn class to the current element being selected and remove from other elements if present
        console.log(selectedTip);
        for(let item of btns.children){
            console.log("id", item.id);
            if(item.id != selectedBtnId && item.classList.contains('selectedBtn')){
                item.classList.remove('selectedBtn');
            }
        }
    });


function resetForm(){
    document.querySelector("#tip-calculator-form").reset();
    clearErrors();
    for(let item of btns.children){
        item.classList.remove('selectedBtn');
        item.value = 0;  
    }
    selectedTip = 0;
    document.querySelector(".tip-info1-value").innerHTML = 0;
    document.querySelector(".total-info2-value").innerHTML = 0;
}

function calculateTotalTip(isFormValidated,ftotalBill,ftotalPeople) {
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

function clearErrors() {
  let errors = document.getElementsByClassName("form-error");
  console.log(errors);
  for (let item of errors) {
    item.innerText = "";
  }
}

function setErrors(id, error) {
  let element = document.getElementById(id);
  console.log("element");
  element.getElementsByClassName("form-error")[0].innerText = error;
}

function validateForm(e) {
  e.preventDefault();
  let returnValue = true;
  clearErrors();

  let form = document.querySelector("#tip-calculator-form");
  let inputBill = form["bill"];
  let totalPeopleInput = form["number-of-people"]


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
  if(selectedTip == 0){
    setErrors("tip-buttons-form","Please select a tip value.")
  }
  if (totalPeopleInput.value <= 0) {
    setErrors("ftotal-people", "Number of people cannot be 0 or negative.");
    returnValue = false;
  }

  calculateTotalTip(returnValue,inputBill.value,totalPeopleInput.value);
  return returnValue;
}
