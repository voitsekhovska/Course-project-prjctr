
import { getResultFromStorage, saveResultToStorage } from "./storage.js";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export const getDateFromInput = (input) => {
  const dateValue = input.value;
  if (!dateValue) return null;
  const date = new Date(dateValue);
  return isNaN(date.getTime()) ? null : date;
};

// перевірка min/max дат інпуту

export const handleStartDateChoice = () => {
  const startDate = getDateFromInput(startDayInput);

  if (startDate) {
    endDayInput.disabled = false;
    endDayInput.min = startDate.toISOString().slice(0, 10);
  }
};

export const handleEndDateChoice = () => {
  const endDate = getDateFromInput(endDayInput);

  if (endDate) {
    startDayInput.max = endDate.toISOString().slice(0, 10);
  }
};

// пресети

export const addPreset = (date, daysAmount) => {
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
        if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
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

const calculateDateInterval = (startDate, endDate, dimension, typeOfDays) => {
  let duration;

  switch (typeOfDays) {
    case "weekdays":
      duration =
        countDaysInPeriod(startDate, endDate, "weekdays") *
        MILLISECONDS_PER_DAY;
      break;
    case "weekends":
      duration =
        countDaysInPeriod(startDate, endDate, "weekends") *
        MILLISECONDS_PER_DAY;
      break;
    default:
      duration = Math.abs(endDate - startDate);
  }

  switch (dimension) {
    case "seconds":
      return `${duration / 1000} ${dimension}`;
    case "minutes":
      return `${duration / (1000 * 60)} ${dimension}`;
    case "hours":
      return `${duration / (1000 * 60 * 60)} ${dimension}`;
    case "days":
      return `${duration / MILLISECONDS_PER_DAY} ${dimension}`;
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

export const addResultLi = (startDate, endDate, result) => {
  const li = document.createElement("li");
  const formattedStartDate = formattedDate(startDate);
  const formattedEndDate = formattedDate(endDate);
  const formattedResult = `${formattedStartDate} - ${formattedEndDate} : ${result}`;
  li.textContent = formattedResult;
  resultList.appendChild(li);

  saveResultToStorage(formattedResult);
};

export const initInputResults = () => {
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

export const initialization = (resultList, resultContainer) => {
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