//Main Chart

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".main-graph")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g") 
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

//Read the data

d3.csv("data/co2-emission-1970-2012.csv")
    .then(function(csvdata){
        console.log(csvdata);
        var year = csvdata.columns.splice(4,43);
        

        year.forEach(element=>{
            element = element.substring(0, element.lastIndexOf(' '));
            
        })
           
        

    console.log(year);
        
    //    console.log(year);
        //doesnt seem the best way to do it
        // year.forEach(element => {
        //     var lastword = element.lastIndexOf(' ');
        //     var word = element.substring(0, lastword);
        //     return word;
        // });
        
    
        // year.forEach(element => {
        //     element.lastIndexOf(' ');
        //     element = 
            
        // });
        // var year = year.split(' ');
        
        









    // group the data: I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
                    .key(function(d) { return d.name;})
                    .entries(csvdata);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
              .domain(d3.extent(csvdata, function(d) { return d.year; }))
              .range([ 0, width ]);
    svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    var y = d3.scaleLinear()
              .domain([0, d3.max(csvdata, function(d) { return +d.n; })])
              .range([ height, 0 ]);
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
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
            return d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(+d.n); })
            (d.values)
        })

})

