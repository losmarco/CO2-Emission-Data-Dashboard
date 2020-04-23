var treeMargin = {top: 10, right: 10, bottom: 10, left: 10},
  treeWidth = 450 - treeMargin.left - treeMargin.right,
  treeHeight = 300 - treeMargin.top - treeMargin.bottom;




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
    const countrytop = countrySorted.slice(0,15);
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
  d3.treemap(root)
      .size([treeWidth, treeHeight])
      .padding(4);
      // (root)

    console.table (root.leaves());
    //use this information to add rectangles:
    svg.selectAll("rect")
       .data(root.leaves())
       .enter()
       .append("rect")
        .attr('x', function (d) { return d.x0; })
        .attr('y', function (d) { return d.y0; })
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style("stroke", "black")
        .style("fill", "#69b3a2");

    // and to add the text labels
    svg.selectAll("text")
       .data(root.leaves())
       .enter()
       .append("text")
        .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
        .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
        .text(function(d){ return d.csvdata.countryName})
        .attr("font-size", "15px")
        .attr("fill", "white")



});
