function getBestPrice(...cloudsArr) {
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
}

function setChartStyle(chat, price, delta, color) {
  chat.style.cssText = `
    ${window.innerWidth <= 715 ? "height" : "width"}: ${
    price * (price > 45 ? delta -6 : delta)
  }px;
    background-color: ${color};
  `;
}

function totalPriceContent(chatPrice, price) {
  chatPrice.textContent = `${price.toFixed(2)}$`;
}

function onCloudChange(chartElem, textPriceElem, cloudData, delta) {
  setChartStyle(
    chartElem,
    cloudData.totalPrice,
    delta,
    cloudData.usageColor(baseColor)
  );
  totalPriceContent(textPriceElem, cloudData.totalPrice);
}
