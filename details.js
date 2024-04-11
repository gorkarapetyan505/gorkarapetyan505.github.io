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
    let FiltrData = finansDitails.filter(e=>e.FinansID == ID).sort((a, b) => b.ID - a.ID);
    let priceSum = FiltrData.reduce((a,b)=>a+ +b.Price,0);
    let TitleE2 = document.getElementById("priceSum");
    TitleE2.innerText = "-" + priceSum;
    this.showElement(FiltrData);
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
  deleteFinansDetails(ID){
    console.log(ID);
    finansDitails = finansDitails.filter(e=> e.ID != ID);
    this.saveLocalStorage();
    this.show();
  }
  showElement(FiltrData){
    let appdiv = document.getElementById("app");
    appdiv.innerText = "";

    for(let i =0;i<FiltrData.length;i++){
      let div1 = document.createElement("div");

      let div2 = document.createElement("div");
      let div2s1 = document.createElement("span");
      div2s1.innerText = FiltrData[i].Name;
      let div2s2 = document.createElement("span");
      div2s2.innerText = getFormattedDateTime(FiltrData[i].Dtn);
      div2.append(div2s1,div2s2);

      let div3 = document.createElement("div");
      let div3div1 = document.createElement("div");
       
      let div3div1b1 = document.createElement("button");
      div3div1b1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="green" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
      </svg>`;
      let div3div1b2 = document.createElement("button");
      div3div1b2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
      </svg>`;
      div3div1b2.addEventListener("click",()=> this.deleteFinansDetails(FiltrData[i].ID));
      div3div1.append(div3div1b1,div3div1b2);
      let div3s2 = document.createElement("span");
      div3s2.innerText = "-" +FiltrData[i].Price;
      div3.append(div3div1,div3s2);

      div1.append(div2,div3);
      appdiv.append(div1);
    }
    
    function getFormattedDateTime(date1) {
      let date = new Date(date1)
      // Get month name
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
      // Get day
      const day = date.getDate();
    
      // Get month name
      const monthName = monthNames[date.getMonth()];
    
      // Get year
      const year = date.getFullYear();
    
      // Get hours
      const hours = date.getHours();
    
      // Get minutes
      const minutes = date.getMinutes();
    
      // Pad single digit minutes with leading zero
      const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
      // Concatenate date, month, year, hours, and minutes
      const formattedDateTime = `${year} ${monthName} ${day}, ${hours}:${paddedMinutes}`;
    
      return formattedDateTime;
    }
    
  }
}
console.log(new App());
