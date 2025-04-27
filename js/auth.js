import {
  validateInput,
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  flag,
} from "./validation.js";
import { signUpUser, loginUser, fetchAddOrUpdateCart } from "./fetchData.js";
import { getAllUsers, loadUsers } from "./dataLoader.js";
import { showCustomAlert } from "./custom/alert.js";

const btnSubmitSignUp = document.querySelector(".signup-btn");
const btnSubmitLogin = document.querySelector(".btn-login");
const formContainer = document.getElementById("signupForm");
const fullName = document.querySelector("[name=fullName]");
const email = document.querySelector("[name=email]");
const password = document.querySelector("[name=password]");
const confirmPassword = document.querySelector("[name=confirmPassword]");

function executeValidation() {
  validateInput(fullName, validateName);
  validateInput(email, validateEmail);
  validateInput(password, validatePassword);
  validateInput(confirmPassword, (val) =>
    validateConfirmPassword(val, password.value)
  );
}

formContainer?.addEventListener("input", (e) => {
  const name = e.target.getAttribute("name");
  switch (name) {
    case "fullName":
      validateInput(fullName, validateName);
      break;
    case "email":
      validateInput(email, validateEmail);
      break;
    case "password":
      validateInput(password, validatePassword);
      break;
    case "confirmPassword":
      validateInput(confirmPassword, (val) =>
        validateConfirmPassword(val, password.value)
      );
      break;
  }
});

btnSubmitSignUp?.addEventListener("click", async (e) => {
  e.preventDefault();
  executeValidation();
  if (!flag) return;
  const user = {
    name: fullName.value,
    email: email.value,
    password: password.value,
  };
  // load users
  await loadUsers();
  const users = getAllUsers();
  const checkEmail = users.find((u) => u.email === user.email);
  if (!checkEmail) {
    // add user in db
    await signUpUser(user);

    location.replace("../pages/login.html");
  } else {
    console.log("User already founded");
    showCustomAlert(
      "error",
      "Error!",
      "User already exists in the system.",
      5000,
      "top-right"
    );
  }
});

btnSubmitLogin?.addEventListener("click", async (e) => {
  e.preventDefault();
  validateInput(email, validateEmail);
  validateInput(password, validatePassword);
  if (!flag) return;

  const user = {
    email: email.value,
    password: password.value,
  };

  const loggedInUser = await loginUser(user);
  if (loggedInUser) {
    console.log("Login successful");
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: loggedInUser.id,
        name: loggedInUser.name,
        email: loggedInUser.email,
      })
    );
    // cart
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) await fetchAddOrUpdateCart(cart);
    console.log(cart);
    location.replace("./../index.html")
    return;
  } else {
    console.log("Login failed");
    showCustomAlert(
      "error",
      "Error!",
      "Email Or Password are wrong",
      5000,
      "top-right"
    );
  }
});
