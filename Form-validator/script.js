//GET DOM ELEMENTS
const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isRequiredValid = checkRequired([
    username,
    email,
    password,
    confirmPassword,
  ]);

  let isFormValid = isRequiredValid;

  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 15);
    const isUsernameStartValid = checkUsername(username);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkLength(password, 6, 25);
    const isPasswordMatch = checkPasswordMatch(password, confirmPassword);

    isFormValid =
      isUsernameValid &&
      isUsernameStartValid &&
      isEmailValid &&
      isPasswordValid &&
      isPasswordMatch;
  }

  if (isFormValid) {
    alert("Registeration Successfull");
    form.reset();

    document.querySelectorAll(".form-group").forEach((group) => {
      group.className = "form-goup";
    });
  }
});

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${formatFieldName(input)} must be at least ${min} characters`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${formatFieldName(input)} must be less than ${max} characters`
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value)) {
    showSuccess(email);
    return true;
  } else {
    showError(email, "Email is not valid");
    return false;
  }
}

function checkPasswordMatch(pass, cpass) {
  if (pass.value !== cpass.value) {
    showError(cpass, `Password do not match`);
    return false;
  }
  return true;
}

function checkUsername(username) {
  console.log("username ", username.value);
  const firstThree = username.value.slice(0, 3);
  const charRegex = /^[A-Za-z]{3}/;
  if (charRegex.test(firstThree)) {
    showSuccess(username);
    return true;
  } else {
    showError(
      username,
      `${formatFieldName(username)} must starts with atleast 3 characters `
    );
    return false;
  }
}

function checkRequired(inputArray) {
  let isValid = true;
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      console.log("input");
      showError(input, `${formatFieldName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });

  return isValid;
}

//formate field name with proper capitalization
function formatFieldName(input) {
  //input id: username => Username
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
}
