var treeMargin = {top: 0, right: 4, bottom: 2, left: 4},
  treeWidth = 890 - treeMargin.left - treeMargin.right,
  treeHeight = 800 - treeMargin.top - treeMargin.bottom;

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
    //Format data for treemap
    const countrytop = countrySorted.slice(0,20);
    countrytop.forEach(element => {
      Object.assign(element, {parent: "Origin"});
    });
    countrytop.unshift({countryName: "Origin", parent: ""});
    // console.log(countrytop);
    
    

    // stratify the data: reformatting for d3.js
    var root = d3.stratify()
    .id(function(d) { return d.countryName; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (countrytop);
    root.sum(function(d) { return +d.latestYear })   // Compute the numeric value for each entity

    // Then d3.treemap computes the position of each element of the hierarchy
    // The coordinates are added to the root object above
    var treemap = d3.treemap()
                    .size([treeWidth, treeHeight])
                    .padding(2);
              
    treemap(root);
    console.table(root.leaves());

    //use this information to add rectangles:
    var cell = treesvg.selectAll("g")
                      .data(root.leaves())
                      .enter().append("g")
                      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });
    
    treecolor = d3.scaleLinear()
      .domain(root.leaves().map( d => {return d.data.latestYear}))
      .range ([]);
      

    cell.append("rect")
        .attr('width', d => d.x1 - d.x0 )
        .attr('height', d => d.y1 - d.y0 )
        .attr("fill", d => { return treecolor(d.parent.value) })
        .attr("opacity", d => { 
          let min = d3.min(root.leaves().map(leaf => leaf.value))
          let max = d3.max(root.leaves().map(leaf => leaf.value))
          return (d.value + 3)/(max-min)  
        });
        
        

    var text = cell.append("text")
                   .attr("x", 5)    
                   .attr("y", 20);

    text.append("tspan")
        .attr("x", 5)    
        .attr("y", 25)
        .attr("class", "country")   
        .text(d => d.id);
        
    text.append("tspan")
        .attr("x", 0)    
        .attr("dx", 6)   
        .attr("dy", 30)
        .attr("class", "value")  
        .text(d => d3.format(".3n")(d.value));
        text.append("tspan")
        .attr("x", 0)    
        .attr("dx", 8)   
        .attr("dy", 15)
        .attr("class", "unit")   
        .text("tCO2/person");
});
