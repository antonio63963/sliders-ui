function getBestPrice(chartConfig, ...cloudsArr) {
  cloudsArr.forEach((cloud) => {
    cloud.isPriceTheBest = false;
    cloud.calculateTotalPrice(
      chartConfig.storageValue,
      chartConfig.transferValue
    );
  });
  cloudsArr.sort((a, b) =>
    a.totalPrice < b.totalPrice ? -1 : b.totalPrice < a.totalPrice ? 1 : 0
  );
  if (chartConfig.storageValue > 0 || chartConfig.transferValue > 0) {
    cloudsArr[0].isPriceTheBest = true;
    const theWorstPrice = cloudsArr[cloudsArr.length - 1].totalPrice;
    setDeltaValue(theWorstPrice, chartConfig);
  }
};

function setDeltaValue(theWorstPrice, chartConfig) {
  if (theWorstPrice > 45) {
    chartConfig.delta = 3;
  } else if (theWorstPrice > 20) {
    chartConfig.delta = 5;
  } else if (theWorstPrice <= 20) {
    chartConfig.delta = 10;
  };
};

function setChartStyle(chat, price, delta, color) {
  chat.style.cssText = `
    ${window.innerWidth <= 715 ? "height" : "width"}: ${price * delta}px;
    background-color: ${color};
  `;
};

function totalPriceContent(chatPrice, price) {
  chatPrice.textContent = `${price.toFixed(2)}$`;
};

function onCloudChange(chartElem, textPriceElem, cloudData, chartConfig) {
  setChartStyle(
    chartElem,
    cloudData.totalPrice,
    chartConfig.delta,
    cloudData.usageColor(chartConfig.baseColor)
  );
  totalPriceContent(textPriceElem, cloudData.totalPrice);
};
