//function object constructor that will be used to store information using the same names as the ID of HTML elements.

function Calculator(form, summary) {
    this.prices = {
      products: 1,
      orders: 2,
      package: {
        basic: 0,
        profesional: 25,
        premium: 60,
      },
      accounting: 30,
      terminal: 5,
    };
  
    //below I will establsh the form value.
  
    this.form = {
      products: form.getelElementByID("products"),
      orders: form.getelElementByID("orders"),
      package: form.getelElementByID("package"),
      accounting: form.getelElementByID("accounting"),
      terminal: form.getelElementByID("terminal"),
    };
  
    //same is done for the second value. This selects all uls and it's childeren (li) that contain the summaries.
  
    this.summary = {
      list: summary.querySelector("ul"),
  
      items: summary.querySelector("ul").children, // check if will work when replaced with "ul li"
  
      total: {
        container: summary.querySelector("#total-price"),
  
        price: summary.querySelector(".total__price"),
      },
    };
  }