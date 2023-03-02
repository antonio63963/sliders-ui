const backblaze = {
  minPayment: 7,
  storagePrice: 0.005,
  transferPrice: 0.01,
  totalPrice: 0,
  getTotalPrice: function () {
    this.totalPrice =
      storageValue * this.storagePrice + transferValue * this.transferPrice;
    return this.totalPrice;
  },
};

const bunny = {
  hdd: true,
  ssd: false,
  maxPayment: 10,
  storageDiskPrice: {
    hdd: 0.01,
    ssd: 0.02,
  },
  transferDiscPrice: 0.01,
  totalPriceSsd: 0,
  totalPriceHdd: 0,
  getTotalPrice: function () {
    this.totalPriceSsd =
      storageValue * this.storageDiskPrice.ssd +
      transferValue * this.transferDiscPrice;
    this.totalPriceHdd =
      storageValue * this.storageDiskPrice.hdd +
      transferValue * this.transferDiscPrice;
  },
};