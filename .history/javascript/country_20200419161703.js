d3.csv("data/co2-emission-1970-2012new.csv")
  .then(function(csvdata){
    const country = csvdata.splice(0,216);
    const countryNew = country.map(e => {
      return { latestYear: e["2012 [YR2012]"], countryName : e["Country Name"]};
    });
    // countryNew.filter(empty);
//need to remove latestYear with ".."
    // function empty(v){
    //   if(v !== null || v !== 0 || v !== "..") {
    //     return v;
    //   }
    // }
    
    
    function sorting(a,b){
      if(a.latestYear < b.latestYear){
        return 1;
      }
      if(a.latestYear > b.latestYear){
        return -1;
      }
      return 0
    }
    countryNew.sort(sorting);
    console.log(countryNew);
    
  });