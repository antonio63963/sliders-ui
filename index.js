const sliderStorage = document.getElementById("sliderStorage");
const storageValueElem = document.getElementById("storageValue");
const sliderTransfer = document.getElementById("sliderTransfer");
const transferValueElem = document.getElementById("transferValue");

const graphChartWrapper = document.querySelector(".graphChartWrapper");
const backblazeChart = document.querySelector(".backblazeChart");
const blazeTotalPriceElem = document.querySelector(".blazeTotalPrice");

const bunnyChart = document.querySelector(".bunnyChart");
const bunnyTotalPriceElem = document.querySelector(".bunnyPrice");
const hddChoiceElem = document.getElementById("hddChoice");
const bunnyOptionsElem = document.querySelector(".bunnyOptions");
const bunnyMaxPaymentTextElem = document.querySelector('.maxPaymentText');

let storageValue = 0;
let transferValue = 0;
const delta = 10; // it affects on maxPayment graph in style max-width: 100px!!!

function onBunnyChange() {
  bunny.getTotalPrice();
  bunnyChart.style.width = `${
    bunny.hdd ? bunny.totalPriceHdd * delta : bunny.totalPriceSsd * delta
  }px`;
  bunnyTotalPriceElem.textContent = bunny.hdd
    ? `${bunny.totalPriceHdd.toFixed(2)}$`
    : `${bunny.totalPriceSsd.toFixed(2)}$`;
  if((bunny.hdd && bunny.totalPriceHdd > bunny.maxPayment) || (!bunny.hdd && bunny.totalPriceSsd > bunny.maxPayment)) {
    bunnyMaxPaymentTextElem.classList.add('visibleElement');
    bunnyMaxPaymentTextElem.textContent = `max \$${bunny.maxPayment}`;
    bunnyTotalPriceElem.classList.add('badPrice');
  } else {
    bunnyMaxPaymentTextElem.classList.remove('visibleElement');
    bunnyMaxPaymentTextElem.textContent = '';
    bunnyTotalPriceElem.classList.remove('badPrice');
  };
};
console.log(bunnyMaxPaymentTextElem)

function onBackblazeChange() {
  backblazeChart.style.width = `${backblaze.getTotalPrice() * delta}px`;
  blazeTotalPriceElem.textContent = `${backblaze.totalPrice.toFixed(2)}$`;
  if (backblaze.totalPrice < backblaze.minPayment) {
    graphChartWrapper.classList.add("badPrice");
  } else {
    graphChartWrapper.classList.remove("badPrice");
  }
};

// handlers
function onStorageSlider(e) {
  let sliderValue = e.target.value;
  storageValue = sliderValue;
  storageValueElem.textContent = sliderValue;

  onBackblazeChange();
  onBunnyChange();
};

function onTransferSlider(e) {
  let data = e.target.value;
  transferValue = data;
  transferValueElem.textContent = data;

  onBackblazeChange();
  onBunnyChange();
};

sliderStorage.addEventListener("input", onStorageSlider);
sliderTransfer.addEventListener("input", onTransferSlider);
bunnyOptionsElem.addEventListener("change", (e) => {
  console.log("hddChoiceElem: ", e.target.value);
  bunny.hdd = e.target.value === "hdd" ? true : false;
  onBunnyChange();
});
