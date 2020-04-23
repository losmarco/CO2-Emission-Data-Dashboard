//Main Chart

// set the dimensions and margins of the graph
var margin1 = {top: 10, right: 30, bottom: 30, left: 60},
    width1 = 460 - margin1.left - margin1.right,
    height1 = 400 - margin1.top - margin1.bottom;

// append the svg object to the body of the page
var svg = d3.select("#main-graph")
            .append("svg")
                .attr("width1", width1 + margin1.left + margin1.right)
                .attr("height1", height1 + margin1.top + margin1.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin1.left + "," + margin1.top + ")");

//Read the data

d3.csv("data/co2-emission-1970-2012.csv")
    .then(function(csvdata){
        console.log(csvdata);
    // group the data: I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
                    .key(function(d) { return d.name;})
                    .entries(csvdata);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
              .domain(d3.extent(csvdata, function(d) { return d.year; }))
              .range([ 0, width1 ]);
    svg.append("g")
       .attr("transform", "translate(0," + height1 + ")")
       .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    var y = d3.scaleLinear()
              .domain([0, d3.max(csvdata, function(d) { return +d.n; })])
              .range([ height1, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // color palette
    var res = sumstat.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

    // Draw the line
    svg.selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width1", 1.5)
        .attr("d", function(d){
            return d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(+d.n); })
            (d.values)
        })

})

