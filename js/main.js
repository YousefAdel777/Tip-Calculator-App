let bill = document.getElementById("bill");
let inputs = document.querySelectorAll("input");
let options = document.querySelectorAll(".option");
let custom = document.getElementById("custom");
let reset = document.getElementById("reset");
let tipVal = document.getElementById("tipVal");
let totalVal = document.getElementById("totalVal");
let people = document.getElementById("people");

inputs.forEach((e) => {
    e.addEventListener("blur", (event) => {
        let error = e.parentElement.previousElementSibling.lastElementChild;
        if (isNaN(event.currentTarget.value)) {
            error.appendChild(document.createTextNode("Must contain numbers"));
            e.classList.add("warning");
        }
        else if (event.currentTarget.value === "0") {
            error.appendChild(document.createTextNode("Can't be zero"));
            e.classList.add("warning");
        }
        else if (event.currentTarget.value !== "") {
            reset.classList.add("active");
            calcTip();
        }
    });
    e.addEventListener("focus", () => {
        e.parentElement.previousElementSibling.lastElementChild.innerHTML = "";
        e.classList.remove("warning");
    });
});

options.forEach((e) => {
    e.addEventListener("click", (event) => {
        options.forEach((element) => {
            element.classList.remove("active");
            custom.value = "";
            custom.classList.remove("warning");
            custom.parentElement.previousElementSibling.lastElementChild.innerHTML = "";
        });
        event.currentTarget.classList.add("active");
        reset.classList.add("active");
        calcTip();
    });
});

custom.onfocus = () => {
    options.forEach((element) => {
        element.classList.remove("active");
    });
}

reset.onclick = (event) => {
    inputs.forEach((e) => {
        e.value = "";
    });
    options.forEach((e) => {
        e.classList.remove("active");
    });
    totalVal.innerHTML = "$0.00";
    tipVal.innerHTML = "$0.00";
    event.currentTarget.classList.remove("active");
}

function calcTip() {
    if (bill.value && people.value) {
        let divisor = document.querySelector(".option.active");
        if (divisor === null) {
            divisor = custom.value;
        }
        else {
            divisor = divisor.innerHTML;
        }
        divisor = Number.parseFloat(divisor);
        if (!isNaN(divisor)) {
            let tipResult = (divisor / 100 * bill.value) / people.value;
            let totalResult = ((divisor / 100 * bill.value) + Number(bill.value)) / people.value;
            tipVal.innerHTML = `$${tipResult.toFixed(2)}`;
            totalVal.innerHTML = `$${totalResult.toFixed(2)}`;
        }
    }
}