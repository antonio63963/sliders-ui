const sliderStorage = document.getElementById("sliderStorage");
const storageValueElem = document.getElementById("storageValue");
const sliderTransfer = document.getElementById("sliderTransfer");
const transferValueElem = document.getElementById("transferValue");

const graphChartWrapper = document.querySelector(".graphChartWrapper");
const backblazeChartElem = document.querySelector(".backblazeChart");
const blazeTotalPriceElem = document.querySelector(".blazeTotalPrice");

const bunnyChartElem = document.querySelector(".bunnyChart");
const bunnyTotalPriceElem = document.querySelector(".bunnyPrice");
const bunnyOptionsElem = document.querySelector(".bunnyOptions");

const scalewayChartElem = document.querySelector(".scalewayChart");
const scalewayTotalPriceElem = document.querySelector(".scalewayPrice");
const scalewayOptionsElem = document.querySelector(".scalewayOptions");

const vultrChartElem = document.querySelector(".vultrChart");
const vultrTotalPriceElem = document.querySelector(".vultrTotalPrice");

let storageValue = 0;
let transferValue = 0;
const delta = 10;
const baseColor = "#757575";

function initCharts() {
  getBestPrice(backblaze, bunny, scaleway, vultr);
  onCloudChange(backblazeChartElem, blazeTotalPriceElem, backblaze, delta);
  onCloudChange(bunnyChartElem, bunnyTotalPriceElem, bunny, delta);
  onCloudChange(scalewayChartElem, scalewayTotalPriceElem, scaleway, delta);
  onCloudChange(vultrChartElem, vultrTotalPriceElem, vultr, delta);
};

initCharts();

// handlers
function onStorageSlider(e) {
  let sliderValue = e.target.value;
  storageValue = sliderValue;
  storageValueElem.textContent = sliderValue;
  initCharts();
};

function onTransferSlider(e) {
  let data = e.target.value;
  transferValue = data;
  transferValueElem.textContent = data;
  initCharts();
};

function onBunnyOptions(e) {
  bunny.isHdd = e.target.value === "hdd" ? true : false;
  initCharts();
};

function onScalewayOptions(e) {
  scaleway.isMulti = e.target.value === "multi" ? true : false;
  initCharts();
};

//events
sliderStorage.addEventListener("input", onStorageSlider);

sliderTransfer.addEventListener("input", onTransferSlider);

bunnyOptionsElem.addEventListener("change", onBunnyOptions);

scalewayOptionsElem.addEventListener("change", onScalewayOptions);
