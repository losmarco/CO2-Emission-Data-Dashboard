d3.csv("data/co2-emission-1970-2012new.csv")
  .then(function(csvdata){
    const country = csvdata.splice(0,216);
    const countryNew = country.map(e => {
      return { latestYear: e["2012 [YR2012]"], countryName : e["Country Name"]};
    });
    countryNew.latestYear.filter(empty);

    function empty(v){
      if(v !== null || v !== 0 || v !== "..") {
        return v;
      }
    }
    // countryNew.sort((a,b)=>{
    //   return b.latestYear - a.latestYear;
    // });
    console.log(countryNew);
    
  });