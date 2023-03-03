const backblaze = {
  name: "backblaze",
  totalPrice: 0,
  isPriceTheBest: false,
  originalColor: "#b61818",
  usageColor: function(baseColor) {
    return this.isPriceTheBest ? this.originalColor : baseColor;
  },
  minPayment: 7,
  storagePrice: 0.005,
  transferPrice: 0.01,
  calculateTotalPrice: function (storageValue, transferValue) {
   const sum = storageValue * this.storagePrice + transferValue * this.transferPrice;
    this.totalPrice = sum < this.minPayment && (storageValue > 0 || transferValue > 0) ? this.minPayment : sum;
  },
};

const bunny = {
  name: "bunny",
  totalPrice: 0,
  isPriceTheBest: false,
  originalColor: "#ff4820",
  usageColor: function(baseColor) {
    return this.isPriceTheBest ? this.originalColor : baseColor;
  },
  isHdd: true,
  maxPayment: 10,
  storageDiskPrice: {
    hdd: 0.01,
    ssd: 0.02,
  },
  transferDiscPrice: 0.01,
  calculateTotalPrice: function (storageValue, transferValue) {
    const sum = this.isHdd
      ? storageValue * this.storageDiskPrice.hdd +
        transferValue * this.transferDiscPrice
      : storageValue * this.storageDiskPrice.ssd +
        transferValue * this.transferDiscPrice;
    this.totalPrice = sum < this.maxPayment ? sum : this.maxPayment;
  },
};

const scaleway = {
  name: "scaleway",
  totalPrice: 0,
  isPriceTheBest: true,
  originalColor: "#7E57C2",
  usageColor: function(baseColor) {
    return this.isPriceTheBest ? this.originalColor : baseColor;
  },
  isMulti: true,
  storageOption: {
    freeGB: 75,
    priceMulti: 0.06,
    priceSingle: 0.03,
    multi: function(storageValue) {
      return storageValue <= this.freeGB
        ? 0
        : (storageValue - this.freeGB) * this.priceMulti;
    },
    single: function(storageValue) {
      return storageValue <= this.freeGB
        ? 0
        : (storageValue - this.freeGB) * this.priceSingle;
    },
  },
  transferOption: {
    freeGB: 75,
    price: 0.02,
    total: function(transferValue) {
      return transferValue <= this.freeGB
        ? 0
        : (transferValue - this.freeGB) * this.price;
    },
  },
  calculateTotalPrice: function (storageValue, transferValue) {
    this.totalPrice = this.isMulti
      ? this.storageOption.multi(storageValue) + this.transferOption.total(transferValue)
      : this.storageOption.single(storageValue) + this.transferOption.total(transferValue);
  },
};

const vultr = {
  name: "vultr",
  totalPrice: 0,
  isPriceTheBest: false,
  originalColor: "#206eff",
  usageColor: function(baseColor) {
    return this.isPriceTheBest ? this.originalColor : baseColor;
  },
  minPayment: 5,
  storagePrice: 0.01,
  transferPrice: 0.01,
  calculateTotalPrice: function (storageValue, transferValue) {
    this.totalPrice =
      storageValue * this.storagePrice + transferValue * this.transferPrice;
  },
};
