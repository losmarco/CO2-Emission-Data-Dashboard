var treeMargin = {top: 10, right: 10, bottom: 10, left: 10},
  treeWidth = 450 - treeMargin.left - treeMargin.right,
  treeHeight = 300 - treeMargin.top - treeMargin.bottom;

var treesvg = d3.select(".treemap")
.append("svg")
  .attr("width", treeWidth + treeMargin.left + treeMargin.right)
  .attr("height", treeHeight + treeMargin.top + treeMargin.bottom)
.append("g")
  .attr("transform",
        "translate(" + treeMargin.left + "," + treeMargin.top + ")");


d3.csv("data/co2-emission-1970-2012new.csv")
  .then(function(csvdata){
    const country = csvdata.splice(0,216);
    const countrySorted = country.map(e => {
      return { latestYear: parseFloat(e["2012 [YR2012]"]), countryName : e["Country Name"]};
    });
    
    countrySorted.sort(function sorting(a,b){
      if( isNaN(a.latestYear) ){
        return 1;
      }
      if( isNaN(b.latestYear) ){
        return -1;
      }
      return b.latestYear - a.latestYear
    });
    console.log(countrySorted);
    
  });
  console.log(window.screen.height);
  
  console.log(window.screen.width);