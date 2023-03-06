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

const chartConfig = {
  storageValue: 0,
  transferValue: 0,
  baseColor: "#757575",
  delta: 10
}

function initCharts() {
  getBestPrice(chartConfig, backblaze, bunny, scaleway, vultr);
  onCloudChange(backblazeChartElem, blazeTotalPriceElem, backblaze, chartConfig);
  onCloudChange(bunnyChartElem, bunnyTotalPriceElem, bunny, chartConfig);
  onCloudChange(scalewayChartElem, scalewayTotalPriceElem, scaleway, chartConfig);
  onCloudChange(vultrChartElem, vultrTotalPriceElem, vultr, chartConfig);
};

initCharts();

// handlers
window.addEventListener('resize', (e) => {
  initCharts();
}); // for flexible resize charts values on breakpoint

function onStorageSlider(e) {
  let sliderValue = e.target.value;
  chartConfig.storageValue = sliderValue;
  storageValueElem.textContent = sliderValue;
  initCharts();
};

function onTransferSlider(e) {
  let data = e.target.value;
  chartConfig.transferValue = data;
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
