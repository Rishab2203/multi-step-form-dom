let nxt_btns = document.querySelectorAll(".nxt-btn");
let currentStep = 1;
function nextStep(e) {
  console.log(e.target.id);
}

nxt_btns.forEach((nxt_btn) => nxt_btn.addEventListener("click", nextStep));
