d3.csv("data/co2-emission-1970-2012new.csv")
  .then(function(csvdata){
    const country = csvdata.splice(0,216);
    const countryNew = country.map(e => {
      return { latestYear: parseFloat(e["2012 [YR2012]"]), countryName : e["Country Name"]};
    });
    
    
    
    countryNew.sort(function sorting(a,b){
      if( !isNaN(a) && !isNaN(b)){
        return 0
        }
      if( !isNaN(a) ){
        return 1;
      }
      if( !isNaN(b) ){
        return -1;
      }
      return a.latestYear - b.latestYear
    });
    
    
    console.log(countryNew);
  });