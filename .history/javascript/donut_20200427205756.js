var donutWidth = 495
    donutHeight = 250
    donutMargin = 10
// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(donutWidth, donutHeight) / 2 - donutMargin;

//append the svg object 'donut'
var donutSvg = d3.select("#donut")
            .append("svg")
            .attr("width", donutWidth)
            .attr("height", donutHeight)
            .append("g")
            .attr("transform", "translate(" + ((donutWidth / 2) - 100) + "," + donutHeight / 2 + ")");

//Color
var donutColor = d3.scaleOrdinal()
.domain(["Agriculture", 
        "Commercial And Public Services", 
        "Electricity And Heat Producers", 
        "Final Consumption", 
        "Industry", 
        "Other Energy Industries", 
        "Residential",
        "Transport"])
.range(["#ffa600", "#ff7c43", "#f95d6a", "#d45087", "#a05195", "#665191", "#2f4b7c", "#003f5c" ]);

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
              "Final Consumption":fcnes,
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
    .outerRadius(radius * 0.9)

  // Build the pie chart
  donutSvg.selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d){ return(donutColor(d.data.key)) })
      .attr("stroke", "white")
      .style("stroke-width", "1px")
      .style("opacity", 1)
      
//Legend
var legendRectSize = 15;
var legendSpacing = 8;

var legend = donutSvg.selectAll('.legend')
                .data(donutColor.domain())
                .enter()
                .append('g')
                .attr('class', 'legend')
                .attr('transform', function(d, i) {
                  var height = legendRectSize + legendSpacing;
                  var offset =  height * donutColor.domain().length / 2;
                  var horz = 9 * legendRectSize;
                  var vert = i * height - offset + 15;
                  return 'translate(' + horz + ',' + vert + ')';
});

legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', donutColor)
      .style('stroke', donutColor);

legend.append('text')
      .attr('x', legendRectSize + legendSpacing )
      .attr('y', legendRectSize - legendSpacing  + 4.4)
      .text(function(d) { return d; });

//Animation

})//closing tag for d3.csv


