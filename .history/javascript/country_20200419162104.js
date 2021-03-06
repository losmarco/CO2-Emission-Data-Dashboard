d3.csv("data/co2-emission-1970-2012new.csv")
  .then(function(csvdata){
    const country = csvdata.splice(0,216);
    const countryNew = country.map(e => {
      return { latestYear: parseInt(e["2012 [YR2012]"].10), countryName : e["Country Name"]};
    });
    console.log(countryNew);
    
    
    function sorting(a,b){
      if(a.latestYear < b.latestYear){
        return 1;
      }
      if(a.latestYear > b.latestYear){
        return -1;
      }
      if(a.latestYear === ".." || b.latestYear === "..")
      return 0
    }
    countryNew.sort(sorting);
    
    
  });