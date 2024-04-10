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
let finans = [];
let finansDitails = [];
class App {
  constructor() {
    this.show();
  }

  show() {
    this.getLocalStoreg();
    let path = window.location.search;
    let ID = +path.substring(+path.indexOf("=") + 1);
    let FindData = finans.find((e) => e.ID == ID);
    let TitleEl = document.getElementById("title");
    TitleEl.innerText = FindData.Name;
    //
    let FiltrData = finansDitails.filter(e=>e.FinansID == ID);
    let priceSum = FiltrData.reduce((a,b)=>a+ +b.Price,0);
    let TitleE2 = document.getElementById("priceSum");
    TitleE2.innerText = "-" + priceSum;
  }
  saveLocalStorage() {
    console.log(finans);
    finans = finans.map((e) => new Finans(e.ID, e.Name, e.Type, e.Dtn, 0));
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
}
console.log(new App());
