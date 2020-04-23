url = "https://charting.numberlens.com/api/teamearth/getdailyco2?authtoken=D43026302F294A5784F7512A8969FE37"

fetch(url)
  .then(response => {
    if(response.ok){ //200-299
      return response.json();
    }else{
      throw new Error('Something went wrong')
    }

  })
  .then((response)=>{
    var co2 = response;
    displayData(co2);
    
  })
  .catch(err=>{
    console.error(err)
  })

function displayData(co2){

  var currentValue = document.querySelector("#current-data-value");
  currentValue.innerHTML = `${co2.CurrentIndexValue}`;

  var currentDate = document.querySelector("#current-data-date");
  currentDate.innerHTML = ` ${co2.CurrentIndexDateDisplay} `; 
  
  var changes = document.querySelector("#changes-data-number");
  changes.innerHTML = `▲ ${co2.IndexValueChangeDisplay} ppm `; 

  var changesPercent = document.querySelector("#changes-data-percent");
  changesPercent.innerHTML = `▲ ${co2.IndexValueChangePercentDisplay} `; 

  var lastValue = document.querySelector("#changes-data-last-value");
  lastValue.innerHTML = `${co2.PerviousIndexValueDisplay}`;

  var lastValueDate = document.querySelector("#changes-data-last-value-date");
  lastValueDate.innerHTML = `${co2.PerviousIndexDateDisplay}`;

  var lastUpdateDate = document.querySelector("#source-last-update-date");
  lastUpdateDate.innerHTML = `Last Update: ${co2.LastUpdateLocalDateDisplay}`;
  
  
  console.log(co2);
  
}
  