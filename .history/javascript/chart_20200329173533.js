//This document is for d3 related script ( ͡° ͜ʖ ͡°)

//Donut Chart
// set the dimensions and margins of the graph
var width = 450
    height = 280
    margin = 30
// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

//append the svg object to the div called 'donut'
var svg = d3.select("#donut")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            
            

//Color
var color = d3.scaleOrdinal()
.domain(["Agriculture", 
        "Commercial And Public Services", 
        "Electricity And Heat Producers", 
        "Final Consumption Not Else where Specified", 
        "Fishing", 
        "Industry", 
        "Other Energy Industries", 
        "Residential",
        "Transport"])
.range(d3.schemeDark2);

d3.csv("data/world-sector.csv")
  .then(function(csvdata){
    
    var latestData = csvdata[csvdata.length - 1];

    var agri = parseInt(latestData.agriculture),
        cap = parseInt(latestData.commercialAndPublicServices),
        eahp = parseInt(latestData.electricityAndHeatProducers),
        fcnes = parseInt(latestData.finalConsumptionNotElsewhereSpecified),
        fishing = parseInt(latestData.fishing),
        industry = parseInt(latestData.industry),
        oei = parseInt(latestData.otherEnergyIndustries),
        residential = parseInt(latestData.residential),
        transport = parseInt(latestData.transport);

  const total = (agri + cap + eahp + fcnes + fishing + industry + oei + residential + transport);

  const percent = 100;

  var agri = ((agri/total) * percent).toFixed(2),
      cap = ((cap/total) * percent).toFixed(2),
      eahp = ((eahp/total) * percent).toFixed(2),
      fcnes = ((fcnes/total) * percent).toFixed(2),
      fishing = ((fishing/total) * percent).toFixed(2),
      industry = ((industry/total) * percent).toFixed(2),
      oei = ((oei/total) * percent).toFixed(2),
      residential = ((residential/total) * percent).toFixed(2),
      transport = ((transport/total) * percent).toFixed(2);


  //Final Data
  var data = {"Agriculture": agri,
              "Commercial And Public Services": cap,
              "Electricity And Heat Producers": eahp,
              "Final Consumption Not Else where Specified":fcnes ,
              "Fishing": fishing,
              "Industry":industry,
              "Other Energy Industries": oei,
              "Residential":residential,
              "Transport":transport
            }

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .sort(null) // Do not sort group by size
    .value(function(d) {return d.value; })
  var data_ready = pie(d3.entries(data))

  // The arc generator + hole size
  var arc = d3.arc()
    .innerRadius(radius * 0.45)         
    .outerRadius(radius * 0.8)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg.selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "white")
      .attr("transform", "translateX(" + 20 + ")")
      .style("stroke-width", "0px")
      .style("opacity", 1)
      

})//closing tag for d3.csv

//Legend
var legendRectSize = 12;
var legendSpacing = 4;

var legend = svg.selectAll('.legend')
                .data(color.domain())
                .enter()
                .append('g')
                .attr('class', 'legend')
                .attr('transform', function(d, i) {
                  var height = legendRectSize + legendSpacing;
                  var offset =  height * color.domain().length / 2;
                  var horz = 10 * legendRectSize;
                  var vert = i * height - offset;
                  return 'translate(' + horz + ',' + vert + ')';
});


legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', color)
  .style('stroke', color);

legend.append('text')
  .attr('x', legendRectSize + legendSpacing )
  .attr('y', legendRectSize - legendSpacing)
  .text(function(d) { return d; });


//End of Donut Chart


  // Add the polylines between chart and labels:
  // svg
  //   .selectAll('allPolylines')
  //   .data(data_ready)
  //   .enter()
  //   .append('polyline')
  //     .attr("stroke", "black")
  //     .style("fill", "none")
  //     .attr("stroke-width", 1)
  //     .attr('points', function(d) {
  //       var posA = arc.centroid(d) // line insertion in the slice
  //       var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
  //       var posC = outerArc.centroid(d); // Label position = almost the same as posB
  //       var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
  //       posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
  //       return [posA, posB, posC]
  //     })

  // Add the polylines between chart and labels:
  // svg
  //   .selectAll('allLabels')
  //   .data(data_ready)
  //   .enter()
  //   .append('text')
  //     .text( function(d) { console.log(d.data.key) ; return d.data.key } )
  //     .attr('transform', function(d) {
  //         var pos = outerArc.centroid(d);
  //         var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
  //         pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
  //         return 'translate(' + pos + ')';
  //     })
  //     .style('text-anchor', function(d) {
  //         var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
  //         return (midangle < Math.PI ? 'start' : 'end')
  //     })