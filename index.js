class Finans {
  constructor(id, name, type, dtn, price) {
    this.ID = id;
    this.Name = name;
    this.Type = type;
    this.Dtn = dtn;
    this.Price = price;
  }
}

class App {
  finans = [
    new Finans(1, "Տռանսպորտ", 1, new Date(), 2000),
    new Finans(1, "Տռանսպորտ", 1, new Date(), 4000),
    new Finans(1, "Տռանսպորտ", 1, new Date(), 5000),
    new Finans(1, "Տռանսպորտ", 1, new Date(), 6000),
    new Finans(1, "Տռանսպորտ", 1, new Date(), 7000),
    new Finans(1, "Տռանսպորտ", 1, new Date(), 8000),
    new Finans(1, "Տռանսպորտ", 1, new Date(), 9000),
    new Finans(1, "Տռանսպորտ", 1, new Date(), 90000),
  ];
  selectedID = 0;
  constructor() {
    this.giveAllFinansType();
  }
  showExpenses(finData) {
    let divExpenses = document.getElementById("expenses");
    divExpenses.innerHTML = "";
    for (let i = 0; i < finData.length; i++) {
      let div1 = document.createElement("div");

      let div2 = document.createElement("div");
      let div2P = document.createElement("p");
      div2P.innerText = finData[i].Name;
      div2.append(div2P);
      div1.append(div2);

      let div3 = document.createElement("div");

      let div4 = document.createElement("div");
      let div4Span = document.createElement("span");
      div4Span.innerText = "-" + finData[i].Price;
      div4.append(div4Span);

      let div5 = document.createElement("div");
      // let div5Btn1 = document.createElement("button");
      // div5Btn1.innerText="-";
      let div5Btn2 = document.createElement("button");
      div5Btn2.innerText = "+";

      div5.append(div5Btn2);
      div3.append(div4, div5);

      div1.append(div2, div3);
      divExpenses.append(div1);
    }
  }
  addFinansType() {
    // let name = "";
  }
  giveAllFinansType() {
    this.showExpenses(this.finans);
    // finans = localStorage.getItem('FinasTypes');
    // console.log(finans);
  }
}
console.log(new App());
