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

const vultrChart = document.querySelector('.vultrChart');
const vultrTotalPriceElem = document.querySelector('.vultrTotalPrice');
console.log(vultrChart);
let storageValue = 0;
let transferValue = 0;
const delta = 10; // it affects on maxPayment graph in style max-width: 100px!!!

function setChartWidth(chat, price, delta) {
  console.log(price, chat.style.width)
  chat.style.width = `${price * delta}px`;
};
function totalPriceContent(chatPrice, price) {
  chatPrice.textContent = `${price.toFixed(2)}$`;
};

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

function onVultr() {
  vultr.getTotalPrice(storageValue, transferValue);
  setChartWidth(vultrChart, vultr.totalPrice, delta);
  totalPriceContent(vultrTotalPriceElem, vultr.totalPrice);
}
console.log(vultr)
// handlers
function onStorageSlider(e) {
  let sliderValue = e.target.value;
  storageValue = sliderValue;
  storageValueElem.textContent = sliderValue;

  onBackblazeChange();
  onBunnyChange();
  onScalewayChange();
  onVultr();
};

function onTransferSlider(e) {
  let data = e.target.value;
  transferValue = data;
  transferValueElem.textContent = data;

  onBackblazeChange();
  onBunnyChange();
  onScalewayChange();
  onVultr();
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