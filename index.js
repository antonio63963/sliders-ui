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
const bunnyMaxPaymentTextElem = document.querySelector(".maxPaymentText");

const scalewayChartElem = document.querySelector(".scalewayChart");
const scalewayTotalPriceElem = document.querySelector(".scalewayPrice");
const scalewayOptionsElem = document.querySelector(".scalewayOptions");

const vultrChart = document.querySelector(".vultrChart");
const vultrTotalPriceElem = document.querySelector(".vultrTotalPrice");
console.log(vultrChart);
let storageValue = 0;
let transferValue = 0;
const delta = 10; // it affects on maxPayment graph in style max-width: 100px!!!

function setChartWidth(chat, price, delta) {
  chat.style.width = `${price * delta}px`;
}

function totalPriceContent(chatPrice, price) {
  chatPrice.textContent = `${price.toFixed(2)}$`;
}

function getBestPrice(cloudsArr) {
  //count real total
  cloudsArr
    .forEach((cloud) => cloud.calculateTotalPrice(storageValue, transferValue));
    cloudsArr.sort((a, b) =>
      a.totalPrice < b.totalPrice ? -1 : b.totalPrice < a.totalPrice ? 1 : 0
    );
  console.log(cloudsArr);
}

function onBackblazeChange() {
  backblaze.calculateTotalPrice(storageValue, transferValue);
  setChartWidth(backblazeChart, backblaze.totalPrice, delta);
  totalPriceContent(blazeTotalPriceElem, backblaze.compareTotalPriceWithMin);
  if (backblaze.totalPrice < backblaze.minPayment) {
    graphChartWrapper.classList.add("badPrice");
  } else {
    graphChartWrapper.classList.remove("badPrice");
  }
}

function onBunnyChange() {
  bunny.calculateTotalPrice(storageValue, transferValue);
  setChartWidth(bunnyChart, bunny.totalPrice, delta);
  totalPriceContent(bunnyTotalPriceElem, bunny.totalPrice);

  if (bunny.totalPrice > bunny.maxPayment) {
    bunnyMaxPaymentTextElem.classList.add("visibleElement");
    bunnyMaxPaymentTextElem.textContent = `max \$${bunny.maxPayment}`;
    bunnyTotalPriceElem.classList.add("badPrice");
  } else {
    bunnyMaxPaymentTextElem.classList.remove("visibleElement");
    bunnyMaxPaymentTextElem.textContent = "";
    bunnyTotalPriceElem.classList.remove("badPrice");
  }
}

function onScalewayChange() {
  scaleway.calculateTotalPrice();
  setChartWidth(scalewayChartElem, scaleway.totalPrice, delta);
  totalPriceContent(scalewayTotalPriceElem, scaleway.totalPrice);
}

function onVultr() {
  vultr.calculateTotalPrice(storageValue, transferValue);
  setChartWidth(vultrChart, vultr.totalPrice, delta);
  totalPriceContent(vultrTotalPriceElem, vultr.totalPrice);
}
// handlers
function onStorageSlider(e) {
  let sliderValue = e.target.value;
  storageValue = sliderValue;
  storageValueElem.textContent = sliderValue;

  onBackblazeChange();
  onBunnyChange();
  onScalewayChange();
  onVultr();
}

function onTransferSlider(e) {
  let data = e.target.value;
  transferValue = data;
  transferValueElem.textContent = data;
  getBestPrice([backblaze, bunny, scaleway, vultr]);
  onBackblazeChange();
  onBunnyChange();
  onScalewayChange();
  onVultr();
}

sliderStorage.addEventListener("input", onStorageSlider);

sliderTransfer.addEventListener("input", onTransferSlider);

bunnyOptionsElem.addEventListener("change", (e) => {
  bunny.isHdd = e.target.value === "hdd" ? true : false;
  onBunnyChange();
});

scalewayOptionsElem.addEventListener("change", (e) => {
  scaleway.isMulti = e.target.value === "multi" ? true : false;
  onScalewayChange();
});
