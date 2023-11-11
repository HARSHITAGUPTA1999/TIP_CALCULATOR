const btns = document.querySelector(".tip-buttons");
const featureList = document.querySelector("#list");
let selectedTip = 0;

//creating the tip selectors btns
function createTipSelectors() {
  for (let [index, value] of tipPercentages.entries()) {
    let btn = document.createElement("BUTTON");
    btn.innerText = value;
    btn.setAttribute("id", `btn${index + 1}`);
    btn.classList.add("btn","btn-primary","tip-selector-btn");
    btns.appendChild(btn);
  }
}

//creating the features section
function createFeaturesSection() {
  for (let [index, value] of features.entries()) {
    let li = document.createElement('li');
    let div = document.createElement('div');
    let span = document.createElement('span');
    let heading = document.createElement('h5');
    let description = document.createElement('p');
    let listSeparator = document.createElement('li');

    div.append(heading);
    div.append(description);
   
    li.append(span);
    li.append(div);
   
    li.classList.add("feature");
    span.classList.add("icon");
    description.classList.add("description");
    listSeparator.classList.add("separator");
    
    heading.innerText = value.heading;
    description.innerText = value.desc;
    span.innerHTML = '&#10003';

    featureList.appendChild(li);
    featureList.appendChild(listSeparator);

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
  document.querySelector(".tip-info1-value").innerHTML = '$ '+ 0;
  document.querySelector(".total-info2-value").innerHTML = '$ ' + 0;
}

//calculate totals and show to user on screen
function calculateTotalTip(isFormValidated, ftotalBill, ftotalPeople) {
  if (isFormValidated) {
    //calcuate the totals else let it remain to 0
    let tipPerPerson = 0;
    let totalPerPerson = 0;
    let totalTip = (selectedTip / 100) * ftotalBill;
    tipPerPerson = parseFloat(totalTip / ftotalPeople).toFixed(2);
    totalPerPerson = parseFloat(ftotalBill / ftotalPeople).toFixed(2);

    document.querySelector(".tip-info1-value").innerHTML ='$ '+ tipPerPerson;
    document.querySelector(".total-info2-value").innerHTML = '$ ' + totalPerPerson;
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

 // JavaScript to toggle the display of the features section
function toggleFeaturesSection() {
  let tipCalculator = document.getElementsByClassName("app-container");
  // console.log()
  let featuresSection = document.getElementById('features-section');
  let app = document.getElementsByClassName('app');

  tipCalculator[0].classList.toggle('hide-calculator');
  featuresSection.classList.toggle('show-features'); 
  featuresSection.classList.toggle('hide-feature-section');
  app[0].classList.toggle('features-body');
  document.getElementById('menu-icon').classList.toggle('active'); 
}


document.getElementById('menu-icon').addEventListener('click', toggleFeaturesSection);
//by default feature section will be hidden only
document.getElementById('features-section').classList.add('hide-feature-section');

const tipPercentages = ["5%", "10%", "15%", "25%", "50%"];
const features = [
  {
    heading: 'Responsive design',
    desc: 'Responsive web design using HTML and CSS.'
  },
  {
    heading: 'Form creation',
    desc: 'Implementation of a form in javascript.'
  },
  {
    heading: 'Error handling',
    desc: 'Showing error states and messages when user enters incomplete or invalid info.'
  },
  {
    heading: 'Tip Selectors functionality',
    desc: 'Giving the user different tip options. HIghlighting the current tip selected by user.'
  },
  {
    heading: 'Calcuating totals',
    desc: 'Calculating and displaying totals on successfull form submission.The totals are displaced upto 2 decimal places only.'
  },
  {
    heading: 'Form reset',
    desc: 'Reseting the form to initial state on clicking of reset button.'
  },

]

createTipSelectors();
createFeaturesSection();
getSelectedTip();
