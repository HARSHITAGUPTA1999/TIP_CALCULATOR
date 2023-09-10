let totalBill = 0;
let selectedTip = 0;
let totalPeople = 0;

document.getElementById("bill").addEventListener("input",(e)=>{
    totalBill = parseInt(e.target.value);
    console.log(totalBill);
});

document.querySelector(".tip-buttons #btn1").addEventListener("click",(e)=>{
    selectedTip = parseInt(e.target.innerText);
    console.log(typeof(selectedTip));
});

document.querySelector("#number-of-people").addEventListener("input",(e)=>{
    totalPeople = parseInt(e.target.value);
    console.log(totalPeople);
});

document.querySelector("#calculate-tip").addEventListener("click",(e)=>{
    let tipPerPerson = 0;
    let totalTip = (selectedTip/100)*totalBill;
    tipPerPerson = totalTip/totalPeople;

    let totalPerPerson = 0;
    totalPerPerson = totalBill/totalPeople;

    document.querySelector(".tip-info1-value").innerHTML = tipPerPerson;
    document.querySelector(".total-info2-value").innerHTML = totalPerPerson;
});


document.querySelector("#reset-btn").addEventListener("click",(e)=>{
    tipPerPerson = 0;
    totalPerPerson = 0;
    totalBill = 0;
    selectedTip = 0;
    totalPeople = 0;
    document.querySelector("#number-of-people").value = totalPeople;
    document.getElementById("bill").value = totalBill;
    document.querySelector(".tip-info1-value").innerHTML = tipPerPerson;
    document.querySelector(".total-info2-value").innerHTML = totalPerPerson;
});



