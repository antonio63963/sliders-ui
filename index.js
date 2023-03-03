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

const scalewayChartElem = document.querySelector(".scalewayChart");
const scalewayTotalPriceElem = document.querySelector(".scalewayPrice");
const scalewayOptionsElem = document.querySelector(".scalewayOptions");

const vultrChart = document.querySelector(".vultrChart");
const vultrTotalPriceElem = document.querySelector(".vultrTotalPrice");
console.log(vultrChart);
let storageValue = 0;
let transferValue = 0;
const delta = 10; // it affects on maxPayment graph in style max-width: 100px!!!
const baseColor = "#757575";

function setChartStyle(chat, price, delta, color) {
  chat.style.cssText = `
    width: ${price * delta}px;
    background-color: ${color};
  `;
}

function totalPriceContent(chatPrice, price) {
  chatPrice.textContent = `${price.toFixed(2)}$`;
}

function getBestPrice(cloudsArr) {
  //count real total
  cloudsArr.forEach((cloud) => {
    cloud.isPriceTheBest = false;
    cloud.calculateTotalPrice(storageValue, transferValue);
  });
  cloudsArr.sort((a, b) =>
    a.totalPrice < b.totalPrice ? -1 : b.totalPrice < a.totalPrice ? 1 : 0
  );
  if (storageValue > 0 || transferValue > 0) {
    cloudsArr[0].isPriceTheBest = true;
  }
  console.log(cloudsArr);
}

function onBackblazeChange() {
  const { totalPrice } = backblaze;
  setChartStyle(
    backblazeChart,
    totalPrice,
    delta,
    backblaze.usageColor(baseColor)
  );
  totalPriceContent(blazeTotalPriceElem, totalPrice);
}

function onBunnyChange() {
  const { totalPrice, usageColor, maxPayment } = bunny;
  setChartStyle(bunnyChart, totalPrice, delta, bunny.usageColor(baseColor));
  totalPriceContent(bunnyTotalPriceElem, totalPrice);
}

function onScalewayChange() {
  const { totalPrice, usageColor } = scaleway;
  setChartStyle(scalewayChartElem, totalPrice, delta, usageColor(baseColor));
  totalPriceContent(scalewayTotalPriceElem, totalPrice);
}

function onVultr() {
  const { totalPrice, usageColor } = vultr;
  setChartStyle(vultrChart, totalPrice, delta, usageColor(baseColor));
  totalPriceContent(vultrTotalPriceElem, totalPrice);
}
// handlers
function onStorageSlider(e) {
  let sliderValue = e.target.value;
  storageValue = sliderValue;
  storageValueElem.textContent = sliderValue;

  getBestPrice([backblaze, bunny, scaleway, vultr]);
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
  getBestPrice([backblaze, bunny, scaleway, vultr]);
  onBunnyChange();
});

scalewayOptionsElem.addEventListener("change", (e) => {
  scaleway.isMulti = e.target.value === "multi" ? true : false;
  getBestPrice([backblaze, bunny, scaleway, vultr]);
  onScalewayChange();
});
