//function object constructor that will be used to store information using the same names as the ID of HTML elements.

function ServiceCalculator(form, summary) {
  this.prices = {
    products: 0.6,
    package: {
      basic: 0,
      professional: 30,
      premium: 65,
    },
    terminal: 5,
    accounting: 40,
    orders: 0.1,
  };
  console.log(this);

  //below I will establsh the form value.

  this.form = {
    accounting: form.querySelector("#accounting"),
    orders: form.querySelector("#orders"),
    terminal: form.querySelector("#terminal"),
    products: form.querySelector("#products"),
    package: form.querySelector("#package"),
  };

  // summary container elements

  this.summary = {
    list: summary.querySelector("ul"),
    items: summary.querySelector("ul").children,
    total: {
      container: summary.querySelector("#total-price"),
      price: summary.querySelector(".total__price"),
    },
  };

  this.addEvents();
}

ServiceCalculator.prototype.addEvents = function () {
  this.form.package.addEventListener("click", this.selectEvent.bind(this));
  this.form.products.addEventListener("change", this.inputEvent.bind(this));
  this.form.products.addEventListener("keyup", this.inputEvent.bind(this));
  this.form.orders.addEventListener("change", this.inputEvent.bind(this));

  console.log(this);

  //below is the JS code for the checkboxes
  this.form.accounting.addEventListener(
    "change",
    this.checkboxEvent.bind(this)
  );
  this.form.terminal.addEventListener("change", this.checkboxEvent.bind(this));
};

ServiceCalculator.prototype.updateTotal = function () {
  const show = this.summary.list.querySelectorAll(".open").length > 0;

  if (show) {
    console.log(this);
    // check if this refferes to the correct value. This has been a pain.
    // Below code would be impossible to do without solution from CL!

    const productSum =
      this.form.products.value < 0
        ? 0
        : this.form.products.value * this.prices.products;
    const ordersSum =
      this.form.orders.value < 0
        ? 0
        : this.form.orders.value * this.prices.orders;
    const packagePrice =
      this.form.package.dataset.value.length === 0
        ? 0
        : this.prices.package[this.form.package.dataset.value];
    const accounting = this.form.accounting.checked
      ? this.prices.accounting
      : 0;
    const terminal = this.form.terminal.checked ? this.prices.terminal : 0;

    this.summary.total.price.innerText =
      "$" + (productSum + ordersSum + packagePrice + accounting + terminal);

    this.summary.total.container.classList.add("open");
  } else {
    this.summary.total.container.classList.remove("open");
  }
};

ServiceCalculator.prototype.updateSummary = function (
  id, calc, total, callback
) {
  const summary = this.summary.list.querySelector("[data-id=" + id + "]");
  const summaryCalc = summary.querySelector(".item__calc");
  const summaryTotal = summary.querySelector(".item__price");

  summary.classList.add("open");
  if (typeof callback === "function") {
    callback(summary, summaryCalc, summaryTotal);
  }

  if (summaryCalc !== null) {
    summaryCalc.innerText = calc;
  }

  summaryTotal.innerText = "$" + total;
};

ServiceCalculator.prototype.inputEvent = function (e) {
  const id = e.currentTarget.id;
  const value = e.currentTarget.value;
  const singlePrice = this.prices[id];
  const totalPrice = value * singlePrice;

  this.updateSummary(id, value + " * $" + singlePrice, totalPrice, function (
    item,
    calc,
    total
  ) {
    if (value < 0) {
      calc.innerHTML = null;
      total.innerText = "Value selected cannot be 0!";
    }

    if (value.length === 0) {
      item.classList.remove("open");
    }
  });

  this.updateTotal();
};

ServiceCalculator.prototype.selectEvent = function (e) {
  this.form.package.classList.toggle("open");

  const value =
    typeof e.target.dataset.value !== "undefined" ? e.target.dataset.value : "";
  const text =
    typeof e.target.dataset.value !== "undefined"
      ? e.target.innerText
      : "Select Service";

  if (value.length > 0) {
    this.form.package.dataset.value = value;
    this.form.package.querySelector(".select__input").innerText = text;

    this.updateSummary("package", text, this.prices.package[value]);
    this.updateTotal();
  } else {
    console.log("ERROR! Check value.length.");
  }
};

ServiceCalculator.prototype.checkboxEvent = function (e) {

  const checkbox = e.currentTarget;
  const id = checkbox.id;
  const checked = e.currentTarget.checked;

  this.updateSummary(id, undefined, this.prices[id], function (item) {
    if (!checked) {
      item.classList.remove("open");
    }
  });

  console.log(this);

  this.updateTotal();
};

//make sure below selectors are correct!!

document.addEventListener("DOMContentLoaded", function () {
  console.log(this);
  const form = document.querySelector(".calc__form");
  console.log(form);
  const summary = document.querySelector(".calc__summary");
  console.log(summary);
  new ServiceCalculator(form, summary);
});
