const claimButton = document.querySelector(".claim-button");
//input elements:
let firstName = document.forms["myForm"]["firstName"];
let lastName = document.forms["myForm"]["lastName"];
let email = document.forms["myForm"]["email"];
let password = document.forms["myForm"]["password"];
const inputs = document.querySelectorAll("input");
const icons = document.querySelectorAll(".icon");
const htmlHead = document.querySelector("head");
const style = document.createElement("style");

function validateForm() {
  if (firstName.value == "") {
    handleInvalidField(firstName, "First name");
  }
  if (lastName.value == "") {
    handleInvalidField(lastName, "Last name");
  }
  if (!email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    handleInvalidField(email, "E-mail");
  }
  if (password.value == "") {
    handleInvalidField(password, "Password");
  }
}

function handleInvalidField(field, nameOfField) {
  const text = document.createElement("p");
  const closestIcon = document.getElementById(`${nameOfField}`);
  closestIcon.style.display = "block";
  text.classList.add("invalid-text");
  text.style.cssText = "float:right; color: hsl(0, 100%, 74%); font-size: 0.7rem; font-style: italic; font-weight:bold";
  if (nameOfField === "E-mail") {
    email.value = "";
    text.textContent = "Looks like this is not an E-mail";
    email.setAttribute("placeholder", "email@example.com");
    style.textContent = `input.email::placeholder {color: hsl(0, 100%, 74%);}`;
    htmlHead.appendChild(style);
  } else {
    text.textContent = `${nameOfField} cannot be empty`;
    field.setAttribute("placeholder", "");
  }
  field.parentNode.insertBefore(text, field.nextSibling);
  field.style.borderColor = "hsl(0, 100%, 74%)";
  claimButton.removeEventListener("click", validateForm);
}

function clearInvalidFields() {
  const invalidTexts = document.querySelectorAll(".invalid-text");
  invalidTexts.forEach((item) => item.remove());
  inputs.forEach((item) => (item.style.borderColor = "#d1d5db"));
  firstName.setAttribute("placeholder", "First Name");
  lastName.setAttribute("placeholder", "Last Name");
  email.setAttribute("placeholder", "Email Address");
  password.setAttribute("placeholder", "Password");
  icons.forEach((icon) => (icon.style.display = "none"));
  claimButton.addEventListener("click", validateForm);
  htmlHead.removeChild(style);
}

inputs.forEach((item) => item.addEventListener("click", clearInvalidFields));
claimButton.addEventListener("click", validateForm);
