d3.csv("data/co2-emission-1970-2012new.csv")
  .then(function(csvdata){
    const country = csvdata.splice(0,216);
    const coun = country.map(e => {
      return { latestYear: e.countryCode };
    });
    console.log(coun);
  });