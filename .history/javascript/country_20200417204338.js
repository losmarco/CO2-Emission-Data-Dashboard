d3.csv("data/co2-emission-1970-2012new.csv")
  .then(function(csvdata){
    const sortNumber = csvdata.splice(0,219);

    console.log(sortNumber);

  });