let inputs = document.querySelectorAll("form input");
let labels = document.querySelectorAll("form label");
let dayIn = document.querySelector("form input#days");
let monthIn = document.querySelector("form input#months");
let yearIn = document.querySelector("form input#years");
let divDays = document.querySelector("form div#days");
let divMonths = document.querySelector("form div#months");
let divYears = document.querySelector("form div#years");
let arrowBtn = document.querySelector("button");
let pOfEmptyerror = document.querySelectorAll("form div p.empty-error");
let pOfInvaliderror = document.querySelectorAll("form div p.invalid-error");
let daysRes = document.querySelector("section.result span.daysRes");
let monthsRes = document.querySelector("section.result span.monthsRes");
let yearsRes = document.querySelector("section.result span.yearsRes");
let special = document.querySelector("div.special");
let closeBtn = document.querySelector("div.special div.close");


inputs.forEach((e) => {
    e.onfocus = function (ele) {
        ele.currentTarget.style.cssText = "border: none; outline: none; border: 1.5px solid hsl(259, 100%, 65%); caret-color: hsl(259, 100%, 65%);";
    }
})




arrowBtn.onclick = function () {
    if (dayIn.value === "") {
        emptyError(dayIn.id);
    }
    if (monthIn.value === "") {
        emptyError(monthIn.id);
    }
    if (yearIn.value === "") {
        emptyError(yearIn.id);
    }
    else {
        findError(dayIn.value, dayIn.id, monthIn.value, monthIn.id, yearIn.value, yearIn.id);
    }
}

function redError(id) {
    let empLabel = document.querySelector(`[for=${id}]`);
    let empIn = document.querySelector(`input#${id}`);
    let empDiv = document.querySelector(`div#${id}`);


    empLabel.style.cssText = "color: hsl(0, 100%, 67%);" // error color"

    empIn.style.cssText = "border: none; outline: none; border: 1.5px solid hsl(0, 100%, 67%);";

    // empDiv.style.cssText = "margin-top: 25px";
}


function emptyError(id) {

    redError(id);

    let empMsg = document.querySelector(`div#${id} p.empty-error`);
    empMsg.style.cssText = "display: block";



}

function findError(days, dId, months, mId, years, yId) {
    // Invalid day, month, year
    let dayErrorP = document.querySelector("div#days p.invalid-error");
    let monthErrorP = document.querySelector("div#months p.invalid-error");
    let yearErrorP = document.querySelector("div#years p.invalid-error");
    let wholeFormError = document.querySelector("div#days p.whole-form-error")
    let daysNumber = Number(days);
    let monthsNumber = Number(months);
    let yearsNumber = Number(years);
    let cnt = 0;
    if (!(daysNumber <= 31 && daysNumber > 0) || isNaN(days) === true) {
        redError(dId);
        dayErrorP.style.cssText = "display: block;";
        cnt++;
    }
    if (monthsNumber > 12 || monthsNumber <= 0 || isNaN(months) === true) {
        redError(mId);
        monthErrorP.style.cssText = "display: block;";
        cnt++;
    }
    if (yearsNumber > 2023 || yearsNumber <= 0 || isNaN(years) === true) {
        redError(yId);
        yearErrorP.style.cssText = "display: block;";
        cnt++;
    }

    // Invalid date
    if (daysNumber === 31) {
        if (monthsNumber !== 1 && monthsNumber !== 3 && monthsNumber !== 5 && monthsNumber !== 7 && monthsNumber !== 8 && monthsNumber !== 10 && monthsNumber !== 12) {
            redError(dId);
            redError(mId);
            redError(yId);
            divDays.style.cssText = "margin-top: 25px"

            wholeFormError.style.cssText = "display: block";
            cnt++;
        }
    }

    // February Month 
    if (monthsNumber === 2) {
        if (daysNumber === 29 || daysNumber === 30) {
            redError(dId);
            redError(mId);
            redError(yId);
            divDays.style.cssText = "margin-top: 25px"
            wholeFormError.style.cssText = "display: block";
            cnt++;
        }
    }
    if (cnt === 0) {
        validation(dId);
        validation(mId);
        validation(yId);
        deleteMsg();
        calculateAge();
    }

    if (daysNumber === 26 && monthsNumber === 2 && yearsNumber === 2004) {
        special.style.cssText = "display: block;";
    }

}

function validation(id) {
    let validLabel = document.querySelector(`[for=${id}]`);
    let validIn = document.querySelector(`input#${id}`);
    let validDiv = document.querySelector(`div#${id}`);
    validDiv.style.cssText = "margin-top: 0"
    validLabel.style.cssText = "color: hsl(0, 1%, 44%);";
    validIn.style.cssText = "border: none; outline: none; border: 1.5px solid hsl(0, 0%, 86%); ";
}

function deleteMsg() {
    let dayEmpMsg = document.querySelector(`div#${dayIn.id} p.empty-error`);
    let monthEmpMsg = document.querySelector(`div#${monthIn.id} p.empty-error`);
    let yearEmpMsg = document.querySelector(`div#${yearIn.id} p.empty-error`);
    let dayErrorP = document.querySelector("div#days p.invalid-error");
    let monthErrorP = document.querySelector("div#months p.invalid-error");
    let yearErrorP = document.querySelector("div#years p.invalid-error");
    let wholeFormError = document.querySelector("div#days p.whole-form-error")

    dayEmpMsg.style.cssText = "display: none";
    monthEmpMsg.style.cssText = "display: none";
    yearEmpMsg.style.cssText = "display: none";
    wholeFormError.style.cssText = "display: none";
    dayErrorP.style.cssText = "display: none;";
    monthErrorP.style.cssText = "display: none;";
    yearErrorP.style.cssText = "display: none;";
}



inputs.forEach((e) => {
    e.onblur = function (ele) {

        ele.currentTarget.style.cssText = "border: none; outline: none; border: 1.5px solid hsl(0, 0%, 86%); ";
    }
});

function calculateAge() {
    let bd = dayIn.value;
    let bm = monthIn.value;
    let by = yearIn.value;
    let date = new Date();
    let cd = date.getDate();
    let cm = date.getMonth() + 1;
    let cy = date.getFullYear();
    if (cd < bd) {
        daysRes.innerHTML = (cd - bd + 30);
        cm--;
    } else {
        daysRes.innerHTML = cd - bd;
    }

    if (cm < bm) {
        monthsRes.innerHTML = (cm - bm + 12);
        cy--;
    } else {
        monthsRes.innerHTML = cm - bm;
    }

    yearsRes.innerHTML = cy - by;

}

closeBtn.onclick = function () {
    special.style.cssText = "display: none;";
}