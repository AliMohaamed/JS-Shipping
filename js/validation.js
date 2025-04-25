export let flag = false;

export function validateInput(input, validationFn) {
  var errorMessage = validationFn(input.value);
  var errorElement = input.nextElementSibling;
  if (errorMessage) {
    if (
      !errorElement ||
      !errorElement.classList.contains("error-message") ||
      !errorElement?.tagName === "P"
    ) {
      errorElement = document.createElement("p");
      errorElement.classList.add("error-message");
      input.after(errorElement);
    }
    errorElement.textContent = errorMessage;
    input.classList.add("input-error");
  } else {
    if (errorElement?.tagName === "P") {
      errorElement.remove();
      input.classList.remove("input-error");
    }
  }
}

export function validateName(name) {
  var regExp = /^[a-zA-Z ]+$/;
  if (name.length === 0) {
    flag = false;
    return "Full Name is required";
  } else if (name.length <= 2) {
    flag = false;
    return "Full Name must greater than 2 character";
  } else if (!regExp.test(name)) {
    flag = false;
    return "Use Characters only";
  } else {
    flag = true;
    return "";
  }
}

export function validateEmail(email) {
  var regExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  if (email.length === 0) {
    flag = false;
    return "Email is required";
  } else if (!regExp.test(email)) {
    flag = false;
    return "Email is not valid";
  } else {
    flag = true;
    return "";
  }
}

export function validatePassword(pass) {
  var regExp =
    /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
  if (pass.length === 0) return "Password is required";
  else if (pass.length < 8) return "Password must be 8 chars at least";
  else if (!regExp.test(pass)) return "Password is not strong";
}

export function validateConfirmPassword(confirmPassword, originalPassword) {
  if (!confirmPassword) return (flag = false), "Confirm Password is required";
  if (confirmPassword !== originalPassword)
    return (flag = false), "Confirm password does not match";
  flag = true;
  return "";
}
