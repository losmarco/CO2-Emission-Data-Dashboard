var treeMargin = {top: 0, right: 5, bottom: 5, left: 5},
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
    //Format data for treemap
    const countrytop = countrySorted.slice(0,10);
    countrytop.forEach(element => {
      Object.assign(element, {parent: "Origin"});
    });
    countrytop.unshift({countryName: "Origin", parent: ""});
    console.log(countrytop);
    
    

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
                    .padding(4);
              
    treemap(root);
    console.table(root.leaves());

    var treecolor = d3.scaleOrdinal(d3.schemeBlues[5]);
    //use this information to add rectangles:
    var cell = treesvg.selectAll("g")
                      .data(root.leaves())
                      .enter().append("g")
                      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

    cell.append("rect")
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style("fill", treecolor);

    
    cell.append("text")
        .attr("x", 5)    
        .attr("y", 20)   
        .text(function(d){return d.id});
        



});
