const sliderStorage = document.getElementById("sliderStorage");
const storageValueElem = document.getElementById("storageValue");
const sliderTransfer = document.getElementById("sliderTransfer");
const transferValueElem = document.getElementById("transferValue");

const graphChartWrapper = document.querySelector(".graphChartWrapper");
const backblazeChart = document.querySelector(".backblazeChart");
const blazeTotalPriceElem = document.querySelector(".blazeTotalPrice");

const bunnyChart = document.querySelector(".bunnyChart");
const bunnyTotalPriceElem = document.querySelector(".bunnyPrice");
const bunnyOptionsElem = document.querySelector(".bunnyOptions");
const bunnyMaxPaymentTextElem = document.querySelector('.maxPaymentText');

const scalewayChartElem = document.querySelector('.scalewayChart');
const scalewayTotalPriceElem = document.querySelector('.scalewayPrice');
const scalewayOptionsElem = document.querySelector('.scalewayOptions');

let storageValue = 0;
let transferValue = 0;
const delta = 10; // it affects on maxPayment graph in style max-width: 100px!!!

function onBackblazeChange() {
  backblazeChart.style.width = `${backblaze.getTotalPrice * delta}px`;
  blazeTotalPriceElem.textContent = `${backblaze.compareTotalPriceWithMin.toFixed(2)}$`;
  if (backblaze.totalPrice < backblaze.minPayment) {
    graphChartWrapper.classList.add("badPrice");
  } else {
    graphChartWrapper.classList.remove("badPrice");
  }
};

function onBunnyChange() {
  bunny.getTotalPrice();
  bunnyChart.style.width = `${
    bunny.isHdd ? bunny.totalPriceHdd * delta : bunny.totalPriceSsd * delta
  }px`;
  bunnyTotalPriceElem.textContent = bunny.isHdd
    ? `${bunny.totalPriceHdd.toFixed(2)}$`
    : `${bunny.totalPriceSsd.toFixed(2)}$`;
  if((bunny.isHdd && bunny.totalPriceHdd > bunny.maxPayment) || (!bunny.isHdd && bunny.totalPriceSsd > bunny.maxPayment)) {
    bunnyMaxPaymentTextElem.classList.add('visibleElement');
    bunnyMaxPaymentTextElem.textContent = `max \$${bunny.maxPayment}`;
    bunnyTotalPriceElem.classList.add('badPrice');
  } else {
    bunnyMaxPaymentTextElem.classList.remove('visibleElement');
    bunnyMaxPaymentTextElem.textContent = '';
    bunnyTotalPriceElem.classList.remove('badPrice');
  };
};

function onScalewayChange() {
  scaleway.getTotalPrice();
  scalewayChartElem.style.width = `${scaleway.totalPrice * delta}px`;
  scalewayTotalPriceElem.textContent = `${scaleway.totalPrice.toFixed(2)}$`;

};

console.log(scalewayChartElem)
// handlers
function onStorageSlider(e) {
  let sliderValue = e.target.value;
  storageValue = sliderValue;
  storageValueElem.textContent = sliderValue;

  onBackblazeChange();
  onBunnyChange();
  onScalewayChange()
};

function onTransferSlider(e) {
  let data = e.target.value;
  transferValue = data;
  transferValueElem.textContent = data;

  onBackblazeChange();
  onBunnyChange();
  onScalewayChange()
};

sliderStorage.addEventListener("input", onStorageSlider);
sliderTransfer.addEventListener("input", onTransferSlider);
bunnyOptionsElem.addEventListener("change", (e) => {
  bunny.isHdd = e.target.value === "hdd" ? true : false;
  onBunnyChange();
});
scalewayOptionsElem.addEventListener('change', (e) => {
  scaleway.isMulti = e.target.value === 'multi' ? true : false;
  onScalewayChange();
})