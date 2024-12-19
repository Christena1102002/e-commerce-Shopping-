
var form = document.getElementById("loginForm");
var inputName = document.getElementById("name");
var inputEmail = document.getElementById("email");
var inputPassword = document.getElementById("password");
var inputConfirmPassword = document.getElementById("confirmpassword");
var nameError = document.getElementById("nameerror");
var emailError = document.getElementById("emailerror");
var passwordError = document.getElementById("passworderror");
var confirmPasswordError = document.getElementById("confirmpassworderror");

var loggedIn = localStorage.getItem("username"); 


if (loggedIn) {
    window.location.href = "home.html";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = '';
    confirmPasswordError.textContent = "";
    let isValid = true;
    if (inputName.value.trim() == '') {
        nameError.textContent = 'Name is required';
        isValid = false;
    }
    else if (!/^[a-zA-Z\s]{3,16}$/.test(inputName.value)) {
        nameError.textContent = "Name should be only characters";
        isValid = false;
    }
    if (inputEmail.value.trim() == '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    }
    else if (!/\S+@\S+\.\S+/.test(inputEmail.value)) {
        emailError.textContent = "Email is not valid";
        isValid = false;
    }
    if (inputPassword.value.trim() == '') {
        passwordError.textContent = 'Password is required';
        isValid = false;
    }
    else if (!/^[a-zA-Z0-9_-]{6,18}$/.test(inputPassword.value)) {
        passwordError.textContent = "Password must be at least 6 and at most 18 characters";
        isValid = false;
    }
    if (inputConfirmPassword.value.trim() == '') {
        confirmPasswordError.textContent = 'Confirm password is required';
        isValid = false;
    }
    else if (inputConfirmPassword.value != inputPassword.value) {
        confirmPasswordError.textContent = "Passwords do not match";
        isValid = false;
    }
    if (isValid) {
        localStorage.setItem('username', inputName.value);
        localStorage.setItem('email', inputEmail.value);
        localStorage.setItem('password', inputPassword.value);
        window.location.href = "home.html";
    }
});





