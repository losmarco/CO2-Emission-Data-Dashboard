d3.csv("data/co2-emission-1970-2012new.csv")
  .then(function(csvdata){
      console.table(csvdata);
      console.log(csvdata["2012 [YR2012]"]);

  });