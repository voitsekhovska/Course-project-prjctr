export const displayErrorMessage = (errorMessage) => {
  const errorBlock = document.createElement("div");
  errorBlock.className = "error-message";
  errorBlock.textContent = errorMessage;
  document.body.appendChild(errorBlock);

  setTimeout(hideErrorMessage, 5000);
};

const hideErrorMessage = () => {
  const errorBlock = document.querySelector(".error-message");
  if (errorBlock) {
    errorBlock.remove();
  }
};
