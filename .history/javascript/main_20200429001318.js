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

     var bisectDate = d3.bisector(function(d) { return d.year; }).left;
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
       .tickFormat(""))
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
    
    //Area
    var area = d3.area()
                 .x((d)=>{return x(d.year)})
                 .y0(height)
                 .y1((d)=>{return y(d.point)});
                   
    svg.append('path')
        .attr('d', area(worldData))
        .attr("class", "area")
        .attr("fill", "url(#gradient)")
        .on("mouseover", function() { focus.style("display", null);tooltip.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); tooltip.style("display", "none");})
        .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(worldData, x0, 1),
                d0 = worldData[i - 1],
                d1 = worldData[i],
                d = x0 - d0.year > d1.year - x0 ? d1 : d0;
            
            focus.attr("transform", "translate(" + x(d.year) + "," + y(d.point) + ")");
            tooltip.attr("style", "left:" + (x(d.year) ) + "px;top:" + y(d.point) + "px;");
            focus.select(".tooltip-time").text(d.year + "  |");
            focus.select(".tooltip-value").text(parseFloat(d.point).toFixed(2));
        }
        
    
    //focus cursor             
    var focus = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");

    focus.append("circle")
         .attr("r", 5);

    focus.append("rect")
         .attr("class", "tooltip")
         .attr("width", 82)
         .attr("height", 30)
         .attr("x", -40)
         .attr("y", -45)
         .attr("rx", 4)
         .attr("ry", 4);

    focus.append("text")
         .attr("class", "tooltip-time")
         .attr("x", -33)
         .attr("y", -26);

    focus.append("text")
         .attr("class", "tooltip-value")
         .attr("x", 8)
         .attr("y", -26);
    

    var lg = svg.append("defs").append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "100%");       
        lg.append("stop")
        .attr("offset", "10%")
        .style("stop-color", "#064364")
        .style("stop-opacity", 0.8)

        lg.append("stop")
        .attr("offset", "89%")
        .style("stop-color", "#ffffff")
        .style("stop-opacity", 0.4)

        
})

