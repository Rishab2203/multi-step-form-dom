let nxt_btns = document.querySelectorAll(".nxt-btn");
let prev_btns = document.querySelectorAll(".prev-btn");
let formData = {};

let currentStep = 1;
function nextStep() {
  if (validateStep()) {
    let currStage = document.querySelector(`#step${currentStep}`);
    currStage.classList.remove("flex");
    currStage.classList.add("hidden");
    currentStep++;
    let nxtStage = document.querySelector(`#step${currentStep}`);
    nxtStage.classList.remove("hidden");
    nxtStage.classList.add("flex");
  }
}

function prevStep() {
  let currStage = document.querySelector(`#step${currentStep}`);
  currStage.classList.remove("flex");
  currStage.classList.add("hidden");
  if (currentStep > 1) {
    currentStep--;
  }

  let prevStage = document.querySelector(`#step${currentStep}`);
  prevStage.classList.remove("hidden");
  prevStage.classList.add("flex");
}

nxt_btns.forEach((nxt_btn) => nxt_btn.addEventListener("click", nextStep));
prev_btns.forEach((prev_btn) => prev_btn.addEventListener("click", prevStep));

function validateStep() {
  let isValid = true;
  if (currentStep === 1) {
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const firstPageFormSpan = document.querySelectorAll(
      ".first-page-form-span"
    );
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneNumberRegex = /^\+?[1-9][0-9]{7,14}$/;

    if (name.value.trim() === "") {
      isValid = false;
      name.classList.add("border-red-300");
      name.nextElementSibling.removeAttribute("hidden");
    }
    if (!emailRegex.test(email.value.trim())) {
      isValid = false;
      email.classList.add("border-red-300");
      email.nextElementSibling.removeAttribute("hidden");
    }
    if (!phoneNumberRegex.test(phone.value.trim())) {
      isValid = false;
      phone.classList.add("border-red-300");
      phone.nextElementSibling.removeAttribute("hidden");
    } else {
      formData.name = name.value.trim();
      formData.email = email.value.trim();
      formData.phone = phone.value.trim();
      console.log(firstPageFormSpan);
      console.log(formData);
      firstPageFormSpan.forEach((span) => span.setAttribute("hidden", "true"));
      [name, email, phone].forEach((inpt) =>
        inpt.classList.remove("border-red-300")
      );
    }
  }
  return isValid;
}
