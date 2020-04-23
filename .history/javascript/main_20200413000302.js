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
        
        //1970 -2012
        const year = csvdata.columns.map(element=>{
            element = element.substring(0, element.lastIndexOf(' '));
            return parseInt(element,10);
            // var parseYear = d3.timeParse("%Y");
            // parseYear(element, e=>{
            //     return parseDate(e);
            // });
            // return element;
        }).splice(4,43);
        // console.log(year);
        
        //for y axis
        const highestYear = csvdata[217]["2012 [YR2012]"];
        
    // group the data: I want to draw one line per group
    // var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    //                 .key(function(d) { return d.name;})
    //                 .entries(csvdata);

    // Add X axis 
    var x = d3.scaleLinear()
              .domain([d3.min(year), d3.max(year)])
              .range([ 0, width ]);
    svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x).ticks(20).tickFormat(d3.format("d")));
    
    // Add Y axis
    var y = d3.scaleLinear()
              .domain([0, highestYear])
              .range([ height, 0 ]);
    svg.append("g")
       .call(d3.axisLeft(y).ticks(6));


  
    var world = csvdata[217];
    const valueString = Object.values(world);
    valueString.splice(0,4);
    const valueNum = valueString.map(Number);
    
  
   
    // console.log(csvdata[217]);
    // Draw the line
    // var line = d3.line()
    //              .x(x(year))
    //              .y(y(valueNum));

    var line = d3.line()
                 .x(x(year))
                 .y(y(valueNum));
              
                
    // svg.append('path').attr('d', line(csvdata));

   
    
    
    // svg.selectAll(".line")
    //     .data(csvdata)
    //     .enter()
    //     .append("path")
    //     .attr("fill", "none")
    //     .attr("stroke", function(d){ return color(d.key) })
    //     .attr("stroke-width", 1.5)
    //     .attr("d", function(d){
    //         return d3.line()
    //         .x(function(d) { return x(d.year); })
    //         .y(function(d) { return y(+d.n); })
    //         (d.values)
    //     })

    // color palette
    // var res = sumstat.map(function(d){ return d.key }) //  list of group names
    // var color = d3.scaleOrdinal()
    // .domain(res)
    // .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

})

