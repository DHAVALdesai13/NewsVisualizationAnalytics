 /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */
      
			////////////////////////////////////////////////////////////// 
			//////////////////////// Set-Up ////////////////////////////// 
			////////////////////////////////////////////////////////////// 

			var margin = {top: 40, right: 100, bottom: 100, left: 350},
				width = Math.min(680, window.innerWidth - 10) - margin.left - margin.right,
				height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
					
			////////////////////////////////////////////////////////////// 
			////////////////////////// Data ////////////////////////////// 
			////////////////////////////////////////////////////////////// 

			var data = [
					  [//iPhone
						{axis:"Business",value:0.22},
						{axis:"Crime",value:0.28},
						{axis:"Politics",value:0.29},
						{axis:"Sports",value:0.17},
						{axis:"",value:0.22},
						{axis:"Food",value:0.02},
						{axis:"Art",value:0.21},
						{axis:"Culture",value:0.50}			
					  ],[//Samsung
						{axis:"Business",value:0.27},
						{axis:"Crime",value:0.16},
						{axis:"Politics",value:0.35},
						{axis:"Sports",value:0.13},
						{axis:"Entertainment",value:0.20},
						{axis:"Food",value:0.13},
						{axis:"Art",value:0.35},
						{axis:"Culture",value:0.38}
					  ],[//Nokia Smartphone
						{axis:"Business",value:0.26},
						{axis:"Crime",value:0.10},
						{axis:"Politics",value:0.30},
						{axis:"Sports",value:0.14},
						{axis:"Entertainment",value:0.22},
						{axis:"Food",value:0.04},
						{axis:"Art",value:0.41},
						{axis:"Culture",value:0.30}
					  ]
					];
			////////////////////////////////////////////////////////////// 
			//////////////////// Draw the Chart ////////////////////////// 
			////////////////////////////////////////////////////////////// 

			var color = d3.scale.ordinal()
				.range(["#EDC951","#CC333F","#00A0B0"]);
				
			var radarChartOptions = {
			  w: width,
			  h: height,
			  margin: margin,
			  maxValue: 0.5,
			  levels: 5,
			  roundStrokes: true,
			  color: color
			};
			//Call function to draw the Radar chart
            RadarChart("radar",".chart-area", data, radarChartOptions);
            RadarChart("bar",".chart-bar", data, radarChartOptions);
            

            function RadarChart(gid,id, data, options) {
                if(gid == "radar"){
                    var cfg = {
                        w: 200,				//Width of the circle
                        h: 200,				//Height of the circle
                        margin: {top: 0, right: 20, bottom: 20, left: 20}, //The margins of the SVG
                        levels: 3,				//How many levels or inner circles should there be drawn
                        maxValue: 0, 			//What is the value that the biggest circle will represent
                        labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
                        wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
                        opacityArea: 0.35, 	//The opacity of the area of the blob
                        dotRadius: 4, 			//The size of the colored circles of each blog
                        opacityCircles: 0.1, 	//The opacity of the circles of each blob
                        strokeWidth: 2, 		//The width of the stroke around each blob
                        roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
                        color: d3.scale.category10()	//Color function
                       };
                       
                       //Put all of the options into a variable called cfg
                       if('undefined' !== typeof options){
                         for(var i in options){
                           if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
                         }//for i
                       }//if
                       
                       //If the supplied maxValue is smaller than the actual one, replace by the max in the data
                       var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
                           
                       var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
                           total = allAxis.length,					//The number of different axes
                           radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
                           Format = d3.format('%'),			 	//Percentage formatting
                           angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
                       
                       //Scale for the radius
                       var rScale = d3.scale.linear()
                           .range([0, radius])
                           .domain([0, maxValue]);
                           
                       /////////////////////////////////////////////////////////
                       //////////// Create the container SVG and g /////////////
                       /////////////////////////////////////////////////////////
                   
                       //Remove whatever chart with the same id/class was present before
                       d3.select(id).select("svg").remove();
                       
                       //Initiate the radar chart SVG
                       var svg = d3.select(id).append("svg")
                               .attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
                               .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
                               .attr("class", "radar"+id);
                       //Append a g element		
                       var g = svg.append("g")
                               .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");
                       
                       /////////////////////////////////////////////////////////
                       ////////// Glow filter for some extra pizzazz ///////////
                       /////////////////////////////////////////////////////////
                       
                       //Filter for the outside glow
                       var filter = g.append('defs').append('filter').attr('id','glow'),
                           feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
                           feMerge = filter.append('feMerge'),
                           feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
                           feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');
                   
                       /////////////////////////////////////////////////////////
                       /////////////// Draw the Circular grid //////////////////
                       /////////////////////////////////////////////////////////
                       
                       //Wrapper for the grid & axes
                       var axisGrid = g.append("g").attr("class", "axisWrapper");
                       
                       //Draw the background circles
                       axisGrid.selectAll(".levels")
                          .data(d3.range(1,(cfg.levels+1)).reverse())
                          .enter()
                           .append("circle")
                           .attr("class", "gridCircle")
                           .attr("r", function(d, i){return radius/cfg.levels*d;})
                           .style("fill", "#CDCDCD")
                           .style("stroke", "#CDCDCD")
                           .style("fill-opacity", cfg.opacityCircles)
                           .style("filter" , "url(#glow)");
                   
                       //Text indicating at what % each level is
                       axisGrid.selectAll(".axisLabel")
                          .data(d3.range(1,(cfg.levels+1)).reverse())
                          .enter().append("text")
                          .attr("class", "axisLabel")
                          .attr("x", 4)
                          .attr("y", function(d){return -d*radius/cfg.levels;})
                          .attr("dy", "0.4em")
                          .style("font-size", "10px")
                          .attr("fill", "#737373")
                          .text(function(d,i) { return Format(maxValue * d/cfg.levels); });
                   
                       /////////////////////////////////////////////////////////
                       //////////////////// Draw the axes //////////////////////
                       /////////////////////////////////////////////////////////
                       
                       //Create the straight lines radiating outward from the center
                       var axis = axisGrid.selectAll(".axis")
                           .data(allAxis)
                           .enter()
                           .append("g")
                           .attr("class", "axis");
                       //Append the lines
                       axis.append("line")
                           .attr("x1", 0)
                           .attr("y1", 0)
                           .attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
                           .attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
                           .attr("class", "line")
                           .style("stroke", "white")
                           .style("stroke-width", "2px");
                   
                       //Append the labels at each axis
                       axis.append("text")
                           .attr("class", "legend")
                           .style("font-size", "11px")
                           .attr("text-anchor", "middle")
                           .attr("dy", "0.35em")
                           .attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
                           .attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
                           .text(function(d){return d})
                           .call(wrap, cfg.wrapWidth);
                   
                       /////////////////////////////////////////////////////////
                       ///////////// Draw the radar chart blobs ////////////////
                       /////////////////////////////////////////////////////////
                       
                       //The radial line function
                       var radarLine = d3.svg.line.radial()
                           .interpolate("linear-closed")
                           .radius(function(d) { return rScale(d.value); })
                           .angle(function(d,i) {	return i*angleSlice; });
                           
                       if(cfg.roundStrokes) {
                           radarLine.interpolate("cardinal-closed");
                       }
                                   
                       //Create a wrapper for the blobs	
                       var blobWrapper = g.selectAll(".radarWrapper")
                           .data(data)
                           .enter().append("g")
                           .attr("class", "radarWrapper");
                               
                       //Append the backgrounds	
                       blobWrapper
                           .append("path")
                           .attr("class", "radarArea")
                           .attr("d", function(d,i) { return radarLine(d); })
                           .style("fill", function(d,i) { return cfg.color(i); })
                           .style("fill-opacity", cfg.opacityArea)
                           .on('mouseover', function (d,i){
                               //Dim all blobs
                               d3.selectAll(".radarArea")
                                   .transition().duration(200)
                                   .style("fill-opacity", 0.1); 
                               //Bring back the hovered over blob
                               d3.select(this)
                                   .transition().duration(200)
                                   .style("fill-opacity", 0.7);	
                           })
                           .on('mouseout', function(){
                               //Bring back all blobs
                               d3.selectAll(".radarArea")
                                   .transition().duration(200)
                                   .style("fill-opacity", cfg.opacityArea);
                           });
                           
                       //Create the outlines	
                       blobWrapper.append("path")
                           .attr("class", "radarStroke")
                           .attr("d", function(d,i) { return radarLine(d); })
                           .style("stroke-width", cfg.strokeWidth + "px")
                           .style("stroke", function(d,i) { return cfg.color(i); })
                           .style("fill", "none")
                           .style("filter" , "url(#glow)");		
                       
                       //Append the circles
                       blobWrapper.selectAll(".radarCircle")
                           .data(function(d,i) { return d; })
                           .enter().append("circle")
                           .attr("class", "radarCircle")
                           .attr("r", cfg.dotRadius)
                           .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
                           .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
                           .style("fill", function(d,i,j) { return cfg.color(j); })
                           .style("fill-opacity", 0.8);
                   
                       /////////////////////////////////////////////////////////
                       //////// Append invisible circles for tooltip ///////////
                       /////////////////////////////////////////////////////////
                       
                       //Wrapper for the invisible circles on top
                       var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
                           .data(data)
                           .enter().append("g")
                           .attr("class", "radarCircleWrapper");
                           
                       //Append a set of invisible circles on top for the mouseover pop-up
                       blobCircleWrapper.selectAll(".radarInvisibleCircle")
                           .data(function(d,i) { return d; })
                           .enter().append("circle")
                           .attr("class", "radarInvisibleCircle")
                           .attr("r", cfg.dotRadius*1.5)
                           .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
                           .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
                           .style("fill", "none")
                           .style("pointer-events", "all")
                           .on("mouseover", function(d,i) {
                               newX =  parseFloat(d3.select(this).attr('cx')) - 10;
                               newY =  parseFloat(d3.select(this).attr('cy')) - 10;
                                       
                               tooltip
                                   .attr('x', newX)
                                   .attr('y', newY)
                                   .text(Format(d.value))
                                   .transition().duration(200)
                                   .style('opacity', 1);
                           })
                           .on("mouseout", function(){
                               tooltip.transition().duration(200)
                                   .style("opacity", 0);
                           });
                           
                       //Set up the small tooltip for when you hover over a circle
                       var tooltip = g.append("text")
                           .attr("class", "tooltip")
                           .style("opacity", 0);
                       
                       /////////////////////////////////////////////////////////
                       /////////////////// Helper Function /////////////////////
                       /////////////////////////////////////////////////////////
                   
                       //Taken from http://bl.ocks.org/mbostock/7555321
                       //Wraps SVG text	
                       function wrap(text, width) {
                         text.each(function() {
                           var text = d3.select(this),
                               words = text.text().split(/\s+/).reverse(),
                               word,
                               line = [],
                               lineNumber = 0,
                               lineHeight = 1.4, // ems
                               y = text.attr("y"),
                               x = text.attr("x"),
                               dy = parseFloat(text.attr("dy")),
                               tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
                               
                           while (word = words.pop()) {
                             line.push(word);
                             tspan.text(line.join(" "));
                             if (tspan.node().getComputedTextLength() > width) {
                               line.pop();
                               tspan.text(line.join(" "));
                               line = [word];
                               tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                             }
                           }
                         });
                       }//wrap
                }
                else if(gid == "bar"){
                    var margin = {top: 20, right: 20, bottom: 30, left: 40},
                        width = 800 - margin.left - margin.right,
                        height = 320 - margin.top - margin.bottom;

                    var x0 = d3.scale.ordinal()
                        .rangeRoundBands([0, width], .1);

                    var x1 = d3.scale.ordinal();

                    var y = d3.scale.linear()
                        .range([height, 0]);

                    var xAxis = d3.svg.axis()
                        .scale(x0)
                        .tickSize(0)
                        .orient("bottom");

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left");

                    var color = d3.scale.ordinal()
                        .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);

                    var svg = d3.select(id).append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    d3.json("./js/d3/data/bardata.json", function(error, data) {

                    var categoriesNames = data.map(function(d) { return d.categorie; });
                    var rateNames = data[0].values.map(function(d) { return d.rate; });

                    x0.domain(categoriesNames);
                    x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);
                    y.domain([0, d3.max(data, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);

                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    svg.append("g")
                        .attr("class", "y axis")
                        .style('opacity','0')
                        .call(yAxis)
                    .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")
                        .style('font-weight','bold')
                        .text("Value");

                    svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

                    var slice = svg.selectAll(".slice")
                        .data(data)
                        .enter().append("g")
                        .attr("class", "g")
                        .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; });

                    slice.selectAll("rect")
                        .data(function(d) { return d.values; })
                    .enter().append("rect")
                        .attr("width", x1.rangeBand())
                        .attr("x", function(d) { return x1(d.rate); })
                        .style("fill", function(d) { return color(d.rate) })
                        .attr("y", function(d) { return y(0); })
                        .attr("height", function(d) { return height - y(0); })
                        .on("mouseover", function(d) {
                            d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
                        })
                        .on("mouseout", function(d) {
                            d3.select(this).style("fill", color(d.rate));
                        });

                    slice.selectAll("rect")
                        .transition()
                        .delay(function (d) {return Math.random()*1000;})
                        .duration(1000)
                        .attr("y", function(d) { return y(d.value); })
                        .attr("height", function(d) { return height - y(d.value); });

                    //Legend
                    var legend = svg.selectAll(".legend")
                        .data(data[0].values.map(function(d) { return d.rate; }).reverse())
                    .enter().append("g")
                        .attr("class", "legend")
                        .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
                        .style("opacity","0");

                    legend.append("rect")
                        .attr("x", width - 18)
                        .attr("width", 18)
                        .attr("height", 18)
                        .style("fill", function(d) { return color(d); });

                    legend.append("text")
                        .attr("x", width - 24)
                        .attr("y", 9)
                        .attr("dy", ".35em")
                        .style("text-anchor", "end")
                        .text(function(d) {return d; });

                    legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

                    });

                }	
                
            }//RadarChart