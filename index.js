class Finans {
  constructor(id, name, type, dtn, price) {
    this.ID = id;
    this.Name = name;
    this.Type = type;
    this.Dtn = dtn;
    this.Price = price;
  }
}
class FinansDitails {
  constructor(id, name, price, dtn, finansID) {
    this.ID = id;
    this.Name = name;
    this.Price = price;
    this.Dtn = dtn;
    this.FinansID = finansID;
  }
}

let selectedID = 0;
let finansCopy = [
  new Finans(1, "Տռանսպորտ", 1, new Date(), 0),
  new Finans(2, "Տան Վարձ", 1, new Date(), 0),
  new Finans(3, "Կոմունալներ", 1, new Date(), 0),
  new Finans(4, "Սնունդ", 1, new Date(), 0),
  new Finans(5, "Հագուստ", 1, new Date(), 0),
  new Finans(6, "Այլ ծապսեր", 1, new Date(), 0),
];
let finans = [];
let finansDitails = [
];
class App {
  constructor() {
    this.pageInitialize();
    this.getLocalStoreg();
    this.giveAllFinansType();
    this.saveButtonClick();
  }
  showExpenses(finData) {
    let divExpenses = document.getElementById("expenses");
    divExpenses.innerHTML = "";
    for (let i = 0; i < finData.length; i++) {
      console.log(finData[i]);
      let div1 = document.createElement("div");

      let div2 = document.createElement("div");
      let div2P = document.createElement("p");
      div2P.innerText = finData[i].Name;
      div2.append(div2P);
      div1.append(div2);

      let div3 = document.createElement("div");

      let div4 = document.createElement("div");
      let div4Span = document.createElement("span");
      div4Span.innerText =
        "-" + (finData[i].Price == undefined ? 0 : finData[i].Price);
      div4.append(div4Span);

      let div5 = document.createElement("div");
      let div5Btn2 = document.createElement("button");
      div5Btn2.innerText = "+";
      div5Btn2.addEventListener("click", () =>
        this.openSaveModal(finData[i].ID)
      );
      div5.append(div5Btn2);
      div3.append(div4, div5);

      div1.append(div2, div3);
      divExpenses.append(div1);
    }
    let allExpensesPrice = finans
      .filter((e) => e.Type == 1)
      .reduce((a, b) => a + b.Price, 0);
    let expenses_pr = document.getElementById("expenses_pr");
    expenses_pr.innerText = "-" + allExpensesPrice;
  }
  openSaveModal(ID) {
    let FData = finans.find((e) => (e.ID = ID));
    let openBtn = document.getElementById("openmodal");
    if (openBtn != null) {
      openBtn.click();
    }
    let title_mod = document.getElementById("title_mod");
    title_mod.innerText = FData?.Name + " ծախսեր";
    selectedID = ID;
  }
  addFinansType() {
    let FTname = document.getElementById("FTname");
    let FTprice = document.getElementById("FTprice");
    let newData = new FinansDitails(
      new Date().getTime(),
      FTname.value,
      FTprice.value,
      new Date(),
      selectedID
    );
    finansDitails.push(newData);
    this.giveAllFinansType();
    let closeSave = document.getElementById("closeSave");
    if (closeSave != null) {
      closeSave.click();
    }
    FTname.value = "";
    FTprice.value = "";
    this.saveLocalStorage();
  }
  giveAllFinansType() {
    for (let i = 0; i < finans?.length; i++) {
      finans[i].Price = finansDitails
        ?.filter((e) => e.FinansID == finans[i].ID)
        .reduce((a, b) => a + +b.Price, 0);
    }
    this.showExpenses(finans);
  }
  saveButtonClick() {
    let saveFT = document.getElementById("saveFT");
    saveFT.addEventListener("click", () => this.addFinansType()); // Use an arrow function here
  }

  saveLocalStorage() {
    console.log(finans);
    finans = finans.map(e=> new Finans (e.ID,e.Name,e.Type,e.Dtn,0))
    var FinansString = JSON.stringify(finans);
    localStorage.setItem("Finans", FinansString);

    var FinansDitailsString = JSON.stringify(finansDitails);
    localStorage.setItem("FinansDitails", FinansDitailsString);
  }
  getLocalStoreg() {
    var FinansData = localStorage.getItem("Finans");
    finans = JSON.parse(FinansData);

    var FinansDitailsData = localStorage.getItem("FinansDitails");
    finansDitails = JSON.parse(FinansDitailsData);
  }
  pageInitialize() {
    var FinansData = localStorage.getItem("Finans");
    var finans2 = JSON.parse(FinansData);
    if (finans2 == null || finans2.length == 0) {
      var FinansString = JSON.stringify(finansCopy);
      localStorage.setItem("Finans", FinansString);
    }
    //
    var FinansFData = localStorage.getItem("FinansDitails");
    var finansF2 = JSON.parse(FinansFData);
    if (finansF2 == null || finans2.length == 0) {
      var FinansString = JSON.stringify([]);
      localStorage.setItem("FinansDitails", FinansString);
    }
  }
}
console.log(new App());
