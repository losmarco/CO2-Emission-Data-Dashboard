d3.csv("data/co2-emission-1970-2012new.csv")
  .then(function(csvdata){
      console.table(csvdata);
      const sortNumber = csvdata;

      console.log(sortNumber);

  });