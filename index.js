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
let finans = [
  new Finans(1, "Տռանսպորտ", 1, new Date(), 0),
  new Finans(2, "Տան Վարձ", 1, new Date(), 0),
  new Finans(3, "Կոմունալներ", 1, new Date(), 0),
  new Finans(4, "Սնունդ", 1, new Date(), 0),
];
let finansDitails = [
  new FinansDitails(1, "Ավտոբուս", 100, new Date(), 1),
  new FinansDitails(1, "Ավտոբուս", 100, new Date(), 1),
  new FinansDitails(1, "Ավտոբուս", 100, new Date(), 1),
  new FinansDitails(1, "Ավտոբուս", 100, new Date(), 1),
  new FinansDitails(1, "Գազ", 524, new Date(), 3),
  new FinansDitails(1, "Ջուր", 1000, new Date(), 3),
];
class App {
  constructor() {
    this.giveAllFinansType();
    this.saveButtonClick();
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
      div5Btn2.addEventListener("click", () =>
        this.openSaveModal(finData[i].ID)
      );
      div5.append(div5Btn2);
      div3.append(div4, div5);

      div1.append(div2, div3);
      divExpenses.append(div1);
    }
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
      4,
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
  }
  giveAllFinansType() {
    console.log(finans);
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
}
console.log(new App());
