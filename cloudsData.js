const backblaze = {
  name: 'backblaze',
  totalPrice: 0,
  minPayment: 7,
  storagePrice: 0.005,
  transferPrice: 0.01,
  calculateTotalPrice: function (storageValue, transferValue) {
    this.totalPrice =
      storageValue * this.storagePrice + transferValue * this.transferPrice;
  },
  get compareTotalPriceWithMin() {
    return this.totalPrice < this.minPayment
      ? this.minPayment
      : this.totalPrice;
  },
};

const bunny = {
  name: 'bunny',
  totalPrice: 0,
  isHdd: true,
  maxPayment: 10,
  storageDiskPrice: {
    hdd: 0.01,
    ssd: 0.02,
  },
  transferDiscPrice: 0.01,
  calculateTotalPrice: function (storageValue, transferValue) {
    this.totalPrice = this.isHdd
      ? storageValue * this.storageDiskPrice.hdd +
        transferValue * this.transferDiscPrice
      : storageValue * this.storageDiskPrice.ssd +
        transferValue * this.transferDiscPrice;
  },
};

const scaleway = {
  name: 'scaleway',
  totalPrice: 0,
  isMulti: true,
  storageOption: {
    freeGB: 75,
    priceMulti: 0.06,
    priceSingle: 0.03,
    get multi() {
      return storageValue <= this.freeGB
        ? 0
        : (storageValue - this.freeGB) * this.priceMulti;
    },
    get single() {
      return storageValue <= this.freeGB
        ? 0
        : (storageValue - this.freeGB) * this.priceSingle;
    },
  },
  transferOption: {
    freeGB: 75,
    price: 0.02,
    get total() {
      return transferValue <= this.freeGB
        ? 0
        : (transferValue - this.freeGB) * this.price;
    },
  },
  calculateTotalPrice: function () {
    this.totalPrice = this.isMulti
      ? this.storageOption.multi + this.transferOption.total
      : this.storageOption.single + this.transferOption.total;
  },
};

const vultr = {
  name: 'vultr',
  totalPrice: 0,
  minPayment: 5,
  storagePrice: 0.01,
  transferPrice: 0.01,
  calculateTotalPrice: function (storageValue, transferValue) {
    this.totalPrice =
      storageValue * this.storagePrice + transferValue * this.transferPrice;
  },
};
