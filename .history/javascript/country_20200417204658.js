d3.csv("data/co2-emission-1970-2012new.csv")
  .then(function(csvdata){
    const country = csvdata.splice(0,216);
    country.sort((a,b)=>{
        return a["Country Name"] - b["Country Name"];
    })
    console.log(country);

  });