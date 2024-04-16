import {
  getDateFromInput,
  calculateDateInterval,
  formattedDate,
} from "./date.js";

import { getResultFromStorage, saveResultToStorage } from "./storage.js";

// DOM variables

const tab1Button = document.getElementById("tab1-button");
const tab2Button = document.getElementById("tab2-button");
const tab1Content = document.querySelector(".tab1-container");
const tab2Content = document.querySelector(".tab2-container");

const startDayInput = document.querySelector("[name='duration-start']");
const endDayInput = document.querySelector("[name='duration-end']");
const dimensionSelect = document.querySelector(
  "[name='dimension-specification']"
);
const dateSelect = document.querySelector("[name='date-specification']");
const resultButton = document.querySelector(".result-button_days");
const weekButtonPreset = document.querySelector(".extension_button-week");
const monthButtonPreset = document.querySelector(".extension_button-month");
const resultList = document.querySelector(".result-container__collection");
const resultContainer = document.querySelector(".result-container");

// переключення табів

function showTab(tabButton, tabContent) {
  tabButton.classList.add("active");
  tabContent.style.display = "block";
}

function hideTab(tabButton, tabContent) {
  tabButton.classList.remove("active");
  tabContent.style.display = "none";
}

function switchTab(
  selectedButton,
  selectedContent,
  unselectedButton,
  unselectedContent
) {
  showTab(selectedButton, selectedContent);
  hideTab(unselectedButton, unselectedContent);
}

switchTab(tab1Button, tab1Content, tab2Button, tab2Content);

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

// додавання результатів у список

const addResultLi = (startDate, endDate, result) => {
  const li = document.createElement("li");
  const formattedStartDate = formattedDate(startDate);
  const formattedEndDate = formattedDate(endDate);
  const formattedResult = `${formattedStartDate} - ${formattedEndDate} : ${result}`;
  li.textContent = formattedResult;
  resultList.appendChild(li);

  saveResultToStorage(formattedResult);
};

const initInputResults = () => {
  resultContainer.style.display = "block";

  const startDate = getDateFromInput(startDayInput);
  const endDate = getDateFromInput(endDayInput);
  const dimension = dimensionSelect.value;
  const selectedDateOption = dateSelect.value;
  const result = calculateDateInterval(
    startDate,
    endDate,
    dimension,
    selectedDateOption
  );
  addResultLi(startDate, endDate, result);
};

const initialization = (resultList, resultContainer) => {
  const results = getResultFromStorage();

  if (results.length > 0) {
    results.forEach((result) => {
      const li = document.createElement("li");
      li.textContent = result;
      resultList.appendChild(li);
    });
    resultContainer.style.display = "block";
  }
};

initialization(resultList, resultContainer);

// event listeners

startDayInput.addEventListener("change", handleStartDateChoice);
endDayInput.addEventListener("change", handleEndDateChoice);
weekButtonPreset.addEventListener("click", () => {
  addPreset(getDateFromInput(startDayInput), 7);
});
monthButtonPreset.addEventListener("click", () => {
  addPreset(getDateFromInput(startDayInput), 30);
});
resultButton.addEventListener("click", initInputResults);
tab1Button.addEventListener("click", () => {
  switchTab(tab1Button, tab1Content, tab2Button, tab2Content);
});
tab2Button.addEventListener("click", () => {
  switchTab(tab2Button, tab2Content, tab1Button, tab1Content);
});
