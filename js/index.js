"use strict";

// DOM variables

const startDayInput = document.querySelector("[name='duration-start']");
const endDayInput = document.querySelector("[name='duration-end']");
const resultButton = document.getElementById("result-button");
const weekButtonPreset = document.querySelector(".extension_button-week");
const monthButtonPreset = document.querySelector(".extension_button-month");

// Date handling function

// перевірка кінцевої дати інпуту
endDayInput.disabled = true;

const handleDateChoice = () => {
  const startDate = new Date(startDayInput.value);
  const endDate = new Date(endDayInput.value);

  if (!isNaN(startDate.getDate())) {
    endDayInput.disabled = false;
    if (!isNaN(endDate.getDate()) && endDate < startDate) {
      endDayInput.value = "";
    }
  } else {
    endDayInput.disabled = true;
  }
};

// пресети

const addWeekPreset = () => {
  const startDate = new Date(startDayInput.value);
  let currentDate = startDate.getDate();
  let week = 7;
  startDate.setDate(currentDate + week);
  endDayInput.value = startDate.toISOString().slice(0, 10);
};

const addMonthPreset = () => {
  const startDate = new Date(startDayInput.value);
  let currentDate = startDate.getDate();
  let month = 30;
  startDate.setDate(currentDate + month);
  endDayInput.value = startDate.toISOString().slice(0, 10);
};

// event listeners

startDayInput.addEventListener("change", handleDateChoice);
endDayInput.addEventListener("change", handleDateChoice);
weekButtonPreset.addEventListener("click", addWeekPreset);
monthButtonPreset.addEventListener("click", addMonthPreset);
// resultButton.addEventListener("click", calculateResult);
