//Main Chart
var margin = {top: 10, right: 30, bottom: 30, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 530 - margin.top - margin.bottom;

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
        });
       
        //world co2 data from 1970-2012 (number)
        const worldCarbon = Object.values(csvdata[217]).splice(2,43).map(v=>{
            return v;
        });
       
        const worldData = year.map((year, index) => {
            return {year, point: worldCarbon[index] }
        });
        
    // Add X axis 
    var x = d3.scaleTime()
              .domain(d3.extent(year, function(d){ return d;}))
              .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class","x-axis")
        .call(d3.axisBottom(x)
                .tickSize(8)
                .ticks(12)
                .tickFormat(d3.format("d")));
    
    // Add Y axis
    var y = d3.scaleLinear()
              .domain([3, d3.max(worldCarbon, function(d) {return d;})])
              .range([ height, 0 ]);
    svg.append("g")
    .attr("class","y-axis")
       .call(d3.axisLeft(y)
               .tickSize(5)
               .ticks(10));

    //Label
    svg.append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .attr("transform", "translate("+ (margin.left - 130 ) +","+(height/2)+")rotate(-90)")  
        .text("Metric tonnes");

    //====== Gridline ======
    function xGridlines() {
        return d3.axisBottom(x)
            .ticks(4)
      }
      function yGridlines() {
        return d3.axisLeft(y)
            .ticks(6)
      }

    svg.append("g")
       .attr("class","grid")
       .attr("transform","translate(0," + height + ")")
       .style("stroke-dasharray",("10,8"))
       .call(xGridlines()
       .tickSize(-height)
       .tickFormat("")
            )
        .call(g => g.select(".domain").remove())
    svg.append("g")
       .attr("class","grid")
       .style("stroke-dasharray",("10,8"))
       .call(yGridlines()
       .tickSize(-width)
       .tickFormat("")
            )
        .call(g => g.select(".domain").remove())

    //Line
    var line = d3.line()
                 .x((d)=>{return x(d.year)})
                 .y((d)=>{return y(d.point)});

    svg.append('path')
        .attr('d', line(worldData))
        .attr("fill", "none") 
        .attr("opacity", "0.9")
        .attr("stroke", "#003059")
        .attr("stroke-width", "3"); 

    var area = d3.area()
                 .x((d)=>{return x(d.year)})
                 .y0(height)
                 .y1((d)=>{return y(d.point)});
                   
    svg.append('path')
        .attr('d', area(worldData))
        .attr("fill", "url(#gradient)"); 

    var lg = svg.append("defs").append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "100%")//since its a vertical linear gradient 
        ;
        lg.append("stop")
        .attr("offset", "0%")
        .style("stop-color", "#09C6F9")//end in red
        .style("stop-opacity", 0.8)

        // lg.append("stop")
        // .attr("offset", "20%")
        // .style("stop-color", "#4364F7")//start in blue
        // .style("stop-opacity", 0.9)

        lg.append("stop")
        .attr("offset", "40%")
        .style("stop-color", "#045DE9")//start in blue
        .style("stop-opacity", 0.7)

        lg.append("stop")
        .attr("offset", "60%")
        .style("stop-color", "#6FB1FC")//start in blue
        .style("stop-opacity", 0.6)

        lg.append("stop")
        .attr("offset", "80%")
        .style("stop-color", "#ffffff")//start in blue
        .style("stop-opacity", 0.4)

        
})

