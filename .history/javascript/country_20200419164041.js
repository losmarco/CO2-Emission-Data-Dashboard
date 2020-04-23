d3.csv("data/co2-emission-1970-2012new.csv")
  .then(function(csvdata){
    const country = csvdata.splice(0,216);
    const countryNew = country.map(e => {
      return { latestYear: parseFloat(e["2012 [YR2012]"]), countryName : e["Country Name"]};
    });
    console.log(countryNew);
    
    
    function sorting(a,b){
      if(a.latestYear === NaN && b.latestYear === NaN){
        return 0
        }
      if(a.latestYear < b.latestYear){
        return 1;
      }
      if(a.latestYear > b.latestYear){
        return -1;
      }
      
    }
    countryNew.sort(sorting);
    
    
  });