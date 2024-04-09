"use strict";

// DOM variables

const startDayInput = document.querySelector("[name='duration-start']");
const endDayInput = document.querySelector("[name='duration-end']");
const dimensionSelect = document.querySelector(
  "[name='dimension-specification']"
);
const resultButton = document.querySelector(".result-button_days");
const weekButtonPreset = document.querySelector(".extension_button-week");
const monthButtonPreset = document.querySelector(".extension_button-month");
const resultList = document.querySelector(".result-container__collection");

// Date handling function

const getDateFromInput = (input) => {
  const dateValue = input.value;
  if (!dateValue) return null;
  const date = new Date(dateValue);
  return isNaN(date.getTime()) ? null : date;
};

// перевірка min/max дат інпуту

const handleStartDateChoice = () => {
  const startDate = getDateFromInput(startDayInput);

  if (startDate) {
    endDayInput.disabled = false;
    endDayInput.min = startDate.toISOString().slice(0, 10);
  }
};

const handleEndDateChoice = () => {
  const endDate = getDateFromInput(endDayInput);

  if (endDate) {
    startDayInput.max = endDate.toISOString().slice(0, 10);
  }
};

// пресети

const addPreset = (date, daysAmount) => {
  if (date) {
    let currentDate = new Date(date);
    currentDate.setDate(date.getDate() + daysAmount);
    endDayInput.value = currentDate.toISOString().slice(0, 10);
  }
};

// опції вибору юзера: всі, вихідні, будні

const countDaysInPeriod = (startDate, endDate, option) => {
  let countResult = 0;
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    switch (option) {
      case "period":
        countResult++;
        break;
      case "weekdays":
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          countResult++;
        }
        break;
      case "weekends":
        if (currentDate.getDay() == 0 || currentDate.getDay() == 6) {
          countResult++;
        }
        break;
      default:
        return null;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return countResult;
};

// функція розрахунку проміжку між датами в імпуті

const calculateDateInterval = (startDate, endDate, dimension) => {
  let duration = Math.abs(endDate - startDate);

  switch (dimension) {
    case "seconds":
      return `${duration / 1000} ${dimension}`;
    case "minutes":
      return `${duration / (1000 * 60)} ${dimension}`;
    case "hours":
      return `${duration / (1000 * 60 * 60)} ${dimension}`;
    case "days":
      return `${duration / (1000 * 60 * 60 * 24)} ${dimension}`;
    default:
      return null;
  }
};

// форматування дати

const addLeadingZero = (number) => {
  return number < 10 ? "0" + number : number;
};

const formattedDate = (date) => {
  const day = addLeadingZero(date.getDate());
  const month = addLeadingZero(date.getMonth() + 1);
  const year = addLeadingZero(date.getFullYear());

  return `${day}-${month}-${year}`;
};

// додавання результатів у список

const addResultLi = (startDate, endDate, result) => {
  const li = document.createElement("li");
  const formattedStartDate = formattedDate(startDate);
  const formattedEndDate = formattedDate(endDate);
  const formattedResult = `${formattedStartDate} - ${formattedEndDate}: ${result}`;
  li.textContent = formattedResult;
  resultList.appendChild(li);
};

const init = () => {
  const startDate = getDateFromInput(startDayInput);
  const endDate = getDateFromInput(endDayInput);
  const dimension = dimensionSelect.value;
  const result = calculateDateInterval(startDate, endDate, dimension);

  addResultLi(startDate, endDate, result);
};

// event listeners

startDayInput.addEventListener("change", handleStartDateChoice);
endDayInput.addEventListener("change", handleEndDateChoice);
weekButtonPreset.addEventListener("click", () => {
  addPreset(getDateFromInput(startDayInput), 7);
});
monthButtonPreset.addEventListener("click", () => {
  addPreset(getDateFromInput(startDayInput), 30);
});
resultButton.addEventListener("click", init);
