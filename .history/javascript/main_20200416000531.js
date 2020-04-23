//Main Chart

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".main-graph")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g") 
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("data/co2-emission-1970-2012new.csv")
    .then(function(csvdata){
        console.log(csvdata);
        
        //1970-2012
        const year = csvdata.columns.map(e=>{
            e = e.substring(0, e.lastIndexOf(' '));
            return parseFloat(e,10);
        }).splice(4,43);
        
        //const yearFormat = d3.timeFormat("%Y");
        
        //for y axis
        const worldHistory = Object.values(csvdata[217]).splice(4,43);

    // Add X axis 
    var x = d3.scaleTime()
              .domain(d3.extent(year, function(d){ return d;}))
              .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(20).tickFormat(d3.format("d")));
    
    // Add Y axis
    var y = d3.scaleLinear()
              .domain([0, d3.max(worldHistory, function(d) {return +d;})])
              .range([ height, 0 ]);
    svg.append("g")
       .call(d3.axisLeft(y).ticks(10));


    // world CO2 emission total
    var wrl = csvdata[217];
    //objectkey to array
    var world = Object.keys(wrl).splice(4,43).map(key=>{
        return [key, wrl[key]];
    });
    console.log(world);
    var worldNew = world.map(([key, value]) => [wrl[key], parseFloat(value)]);

    year.forEach((number, index)=>{
        worldNew[index][0] = number;
    });
    console.log(worldNew);

    var datay = Object.entries(wrl).splice(4,43).map(([key, value])=>{
        return ([key, wrl[key]],parseFloat(value));
    });
    console.log(datay);
    
    // for(key in wrl){
    //     var test = []
    //     console.log(wrl[key]);
        
    // }    
    
    // Draw the line
    // var line = d3.line()
    //              .x(x(year))
    //              .y(y(valueNum));
 
    var line = d3.line()
                .x(x(year))
                .y(y(datay));
              
                
    svg.append('path')
        .attr('d', line())
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1);

   
    

    // color palette
    // var res = sumstat.map(function(d){ return d.key }) //  list of group names
    // var color = d3.scaleOrdinal()
    // .domain(res)
    // .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])
    
    // group the data: I want to draw one line per group
    // var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    //                 .key(function(d) { return d.name;})
    //                 .entries(csvdata);

})

