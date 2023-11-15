import "../style/main.css";
import "../style/custom.scss";
import anime from "animejs/lib/anime.es.js";
import validate from "validate.js";
let $nums = document.querySelectorAll(".num");
let form = document.querySelector("form");
validate.validators.checkDay = function (value, options, key, attributes) {
    if (value > 31) {
        return "invalid";
    }
};
validate.validators.checkYear = function (value, options, key, attributes) {
    let currentYear = new Date();
    if (value > currentYear.getFullYear() || value <= 1950) {
        return "invalid";
    }
};
validate.validators.checkMonth = function (value, options, key, attributes) {
    if (value > 12) {
        return "invalid";
    }
};
validate.validators.checkmaxDay = function (value, options, key, attributes) {
    let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let {month, year} = attributes;
    if (+year % 4 !== 0) {
        ListofDays[1] = 29;
    }
    if (value > ListofDays[month - 1]) {
        return "invalid";
    }
};
validate.validators.checkType = function (value, options, key, attributes) {
    if (isNaN(Number(value))) {
        return "must be a number";
    }
};
const validateObj = {
    day: {
        presence: {
            message: "required",
        },

        checkDay: true,
        checkmaxDay: true,
        checkType: true,
    },
    month: {
        presence: {
            message: "required",
        },

        checkMonth: true,
        checkType: true,
    },
    year: {
        presence: {
            message: "required",
        },
        checkYear: true,
        checkType: true,
    },
};
document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        let $status = handelSubmit(form);
        if ($status === "valid") {
            $calculateAge();
        }
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let $status = handelSubmit(form);
    if ($status === "valid") {
        $calculateAge();
    }
});

function handelSubmit(form) {
    let LengthOfErrors = 0;
    let validatiion =
        validate(validate.collectFormValues(form), validateObj) || {};
    let collecton = validate.collectFormValues(form);
    for (let prop in collecton) {
        if (validatiion.hasOwnProperty(prop)) {
            LengthOfErrors++;
            $runError(form[prop], validatiion[prop][0], true);
        } else {
            $runError(form[prop]);
        }
    }
    if (LengthOfErrors === 0) {
        return "valid";
    }
}
function $runError($el = "", msg = "", $status = false) {
    if ($status) {
        $el.nextElementSibling.textContent = msg;
        $el.parentElement.classList.add("error");
        $el.parentElement.classList.remove("valid");
    } else {
        $el.nextElementSibling.textContent = msg;
        $el.parentElement.classList.remove("error");
        $el.parentElement.classList.add("valid");
    }
}

function $calculateAge() {
    let birthDate = new Date(
        `${form.year.value}-${form.month.value}-${form.day.value}`
    );
    let otherDate = new Date();
    let year = otherDate.getFullYear() - birthDate.getFullYear();
    let $month = otherDate.getMonth() - birthDate.getMonth();
    let $day = otherDate.getMonth() - birthDate.getMonth();
    if (otherDate.getDate() < birthDate.getDate()) {
        let $ay = otherDate.getDate() + 30;
        $day = $ay - birthDate.getDate();
        $month = $month - 1;
    }
    if (otherDate.getMonth() < birthDate.getMonth()) {
        let $newMo = otherDate.getMonth() + 12;
        $month = $newMo - birthDate.getMonth();
    }
    if (
        otherDate.getMonth() < birthDate.getMonth() ||
        (otherDate.getMonth() == birthDate.getMonth() &&
            otherDate.getDate() < birthDate.getDate())
    ) {
        year--;
    }

    anime({
        targets: $nums[0],
        innerHTML: [0, year],
        easing: "linear",
        round: 10,
        duration: 200,
    });
    anime({
        targets: $nums[1],
        innerHTML: [0, $month],
        easing: "linear",
        round: 10,
        duration: 100,
    });
    anime({
        targets: $nums[2],
        innerHTML: [0, $day],
        easing: "linear",
        round: 10,
    });
}
