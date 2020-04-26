//Main Chart

var margin = {top: 10, right: 30, bottom: 30, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var svg = d3.select(".main-graph")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g") 
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("data/co2-emission-1970-2012new.csv")
    .then(function(csvdata){
                
        //1970-2012 (number)
        const year = csvdata.columns.splice(2,43).map(e=>{
            e = e.substring(0, e.lastIndexOf(' '));
            return e;
            // return parseFloat(e, 10);
        });
        // const timeConver = d3.timeParse("%Y");
        // timeConver(year);
        // console.log(year);
        //world co2 data from 1970-2012 (number)
        const worldCarbon = Object.values(csvdata[217]).splice(2,43).map(v=>{
            return parseFloat(v);
        });
        // console.log(worldCarbon);
        // world CO2 emission total
        var wrl = csvdata[217];
        
        var test1 = Object.entries(wrl).splice(2,43).map(key,value=>{
            return {key, value};
        });
        console.log(test1);
        //objectkey to array
        var world = Object.keys(wrl).splice(2,43).map(key=>{
            return [key, wrl[key]];
        });

        var worldNew = world.map(([key, value]) => [wrl[key], parseFloat(value)]);

        year.forEach((number, index)=>{
            worldNew[index][0] = number;
        });
        
        
        
    // Add X axis 
    var x = d3.scaleTime()
              .domain(d3.extent(year, function(d){ return d;}))
              .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(20).tickFormat(d3.format("d")));
    
    // Add Y axis
    var y = d3.scaleLinear()
              .domain([0, d3.max(worldCarbon, function(d) {return +d;})])
              .range([ height, 0 ]);
    svg.append("g")
       .call(d3.axisLeft(y).ticks(10));    
    

//    var bigdata = [year, worldCarbon];
//    console.log(bigdata);

//     var line = d3.line()
//                  .x((d)=>{return x(d[0])})
//                  .y((d)=>{return y(d[1])});
              
                
//     svg.append('path')
//         .attr('d', line(bigdata))
//         .attr("fill", "none") 
//         .attr("stroke", "black")
//         .attr("stroke-width", 1);




    var line = d3.line();
       
    svg.append('path')
        .attr('d', line(worldNew))
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

