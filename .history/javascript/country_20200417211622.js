d3.csv("data/co2-emission-1970-2012new.csv")
  .then(function(csvdata){
    const countries = csvdata.splice(0,216);
   
    const countryNew = countries.map(({ "2012 [YR2012]"}) => ({ latestYear: "2012 [YR2012]" }));

    console.log(countryNew);
    // country.sort((a,b)=>{
    //     return a.("2012 [YR2012]") - b.("2012 [YR2012]");
    // })
    console.log(country);

  });