let nxt_btns = document.querySelectorAll(".nxt-btn");
let prev_btns = document.querySelectorAll(".prev-btn");
let formData = {};
let monthly = true;
const plans = {
  arcade: { yearly: 90, monthly: 9 },
  advance: { yearly: 120, monthly: 12 },
  pro: { yearly: 150, monthly: 15 },
};
const addOns = [
  {
    id: "online-service",
    serviceName: "Online Service",
    price: { monthly: 1, yearly: 10 },
  },
  {
    id: "larger-storage",
    serviceName: "Larger Storage",
    price: { monthly: 2, yearly: 20 },
  },
  {
    id: "customizable-profile",
    serviceName: "Customizable Profile",
    price: { monthly: 2, yearly: 20 },
  },
];
let addOnsSelected = [];

let currentStep = 1;
function nextStep() {
  if (validateStep()) {
    let currStage = document.querySelector(`#step${currentStep}`);
    let currtrack = document.querySelector(`#track-${currentStep}`);
    currStage.classList.remove("flex");
    currStage.classList.add("hidden");
    currtrack.classList.remove("active-track");
    currentStep++;
    let nxtStage = document.querySelector(`#step${currentStep}`);
    let nxtrack = document.querySelector(`#track-${currentStep}`);
    nxtStage.classList.remove("hidden");
    nxtStage.classList.add("flex");
    nxtrack.classList.add("active-track");
  }
  //   console.log(formData);
}

function prevStep() {
  let currStage = document.querySelector(`#step${currentStep}`);
  let currtrack = document.querySelector(`#track-${currentStep}`);
  currStage.classList.remove("flex");
  currStage.classList.add("hidden");
  currtrack.classList.remove("active-track");
  if (currentStep > 1) {
    currentStep--;
  }

  let prevStage = document.querySelector(`#step${currentStep}`);
  let prevtrack = document.querySelector(`#track-${currentStep}`);
  prevStage.classList.remove("hidden");
  prevStage.classList.add("flex");
  prevtrack.classList.add("active-track");
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
      //   console.log(firstPageFormSpan);
      //   console.log(formData);
      firstPageFormSpan.forEach((span) => span.setAttribute("hidden", "true"));
      [name, email, phone].forEach((inpt) =>
        inpt.classList.remove("border-red-300")
      );
    }
  }

  if (currentStep === 2) {
    if (!formData["plan"]) {
      alert("select one package two move ahead.");
      isValid = false;
    }
  }

  if (currentStep === 3) {
    formData["addOn"] = [];
    addOns.forEach((add) => {
      if (addOnsSelected.includes(add.id)) {
        formData["addOn"].push(add);
      }
    });
    finishingUpPage();
  }

  return isValid;
}

/////////////Step-2 plan toggle//////////////////

let planToggleBtn = document.querySelector(".plan-toggle-btn");

planToggleBtn.addEventListener("change", () => {
  monthly = !monthly;
  const packageCards = document.querySelectorAll(".package-card");

  packageCards.forEach((card) => {
    let plan = card.firstElementChild.textContent.toLowerCase();

    if (!monthly) {
      card.innerHTML = ` <span class="text-blue-950">${card.firstElementChild.textContent}</span> 
        <span  class=" text-sm text-gray-500"
        >$${plans[plan]["yearly"]}/yr</span
      >
      <span  class="text-sm font-bold text-blue-950 yearly-plan"
        >2 months free</span
      >`;
    } else {
      packageCards.forEach((card) => {
        let plan = card.firstElementChild.textContent.toLowerCase();
        card.innerHTML = ` <span class="text-blue-950">${card.firstElementChild.textContent}</span>
           <span class=" text-sm text-gray-500">$${plans[plan]["monthly"]}/mo</span>`;
      });
    }
  });

  //////////////////step-3//////////////////////////////////////////////////////////////

  ///////////////////changing the step-3 add-ons ////////////////////
  const addOnServices = document.querySelectorAll(".add-on-service");

  addOnServices.forEach((service, index) => {
    if (!monthly) {
      service.textContent = `$${addOns[index]["price"]["yearly"]}/yr`;
    } else {
      service.textContent = `$${addOns[index]["price"]["monthly"]}/mo`;
    }
  });
});

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    // Remove "selected" class from all cards
    cards.forEach((c) => {
      c.classList.remove("border-purple-400");
      c.classList.remove("bg-gray-100");
    });

    // Add "selected" class to clicked card
    card.classList.add("border-purple-400");
    card.classList.add("bg-gray-100");

    let selectedPlan = card.querySelector("input").value;

    formData.plan = selectedPlan;
    formData.planCost = monthly
      ? plans[selectedPlan]["monthly"]
      : plans[selectedPlan]["yearly"];
    formData.planType = monthly ? "monthly" : "yearly";
    // console.log(formData);

    card.querySelector("input").checked = true;
  });
});

// Select the first card by default
// cards[0].classList.add("border-purple-400");
// cards[0].classList.add("bg-gray-100");
// cards[0].querySelector("input").checked = true;

///////////////Adding the selected add-ons in an array////////////

const addOnsInputs = document.querySelectorAll(".form-checkbox");

addOnsInputs.forEach((input) =>
  input.addEventListener("change", () => {
    if (input.checked) {
      addOnsSelected.push(input.value);
    } else {
      addOnsSelected = addOnsSelected.filter((addOn) => addOn != input.value);
    }
  })
);

//////////////////////////////step-4////////////////////////////////////

function finishingUpPage() {
  const packageNameAndType = document.querySelector("#package-name-and-type");
  const packagePrice = document.querySelector("#package-price");
  const addOnsBill = document.querySelector(".add-ons-bill");
  const totalPrice = document.querySelector("#grand-total");
  const totalSpan = document.querySelector("#total-span");
  const hr = document.querySelector("#finishing-up-hr");
  let total = formData.planCost;
  packagePrice.textContent = monthly
    ? `$${formData["planCost"]}/mo`
    : `$${formData["planCost"]}/yr`;
  packageNameAndType.textContent = monthly
    ? `${
        formData["plan"][0].toUpperCase() + formData["plan"].slice(1)
      }(Monthly)`
    : `${
        formData["plan"][0].toUpperCase() + formData["plan"].slice(1)
      }(Yearly)`;

  formData["addOn"].forEach((addOn) => console.log(addOn["price"]["monthly"]));
  addOnsBill.innerHTML = "";
  formData["addOn"].forEach((addOn) => {
    let div = document.createElement("div");
    div.innerHTML = `        <div class="flex justify-between items-center">
                  <span class="text-gray-400">${addOn["serviceName"]}</span
                  ><span class="text-[#00295c]">+$${
                    monthly
                      ? addOn["price"]["monthly"]
                      : addOn["price"]["yearly"]
                  }/${monthly ? "mo" : "yr"}</span>
                </div>`;
    addOnsBill.appendChild(div);

    total += monthly ? addOn["price"]["monthly"] : addOn["price"]["yearly"];
  });
  if (formData["addOn"].length === 0) {
    hr.setAttribute("hidden", "true");
  } else {
    hr.removeAttribute("hidden");
  }
  totalSpan.textContent = `Total ${monthly ? "(per month)" : "(per year)"}`;
  totalPrice.textContent = `+$${total}/${monthly ? "mo" : "yr"}`;
}

////////////////////////plan-change-btn///////////////////
let planChange = document.querySelector("#plan-change-btn");

planChange.addEventListener("click", () => {
  let step2 = document.querySelector("#step2");
  let step4 = document.querySelector("#step4");
  let track2 = document.querySelector("#track-2");
  let track4 = document.querySelector("#track-4");

  step4.classList.remove("flex");
  step4.classList.add("hidden");
  step2.classList.remove("hidden");
  step2.classList.add("flex");
  track2.classList.add("active-track");
  track4.classList.remove("active-track");
  currentStep = 2;
});
