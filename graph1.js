//plots first graph

// set the dimensions
var margin = {top: 10, right: 30, bottom: 20, left: 100},
    width = 1400 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to page
var svg = d3.select("#viz1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// parse
d3.csv("5atables - Sheet2.csv", function(data) {

  // list of subgroups, slice heads
  var subgroups = data.columns.slice(1)

  // List of groups displayed on x axis
  var groups = d3.map(data, function(d){return(d.group)}).keys()

  // x axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0));

  // y axis
  var y = d3.scaleLinear()
    .domain([0, 60000])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 100)
      .attr("y", -100)
      .text("Y AXIS")

  // subgroup scale
  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8','#4daf4a'])

  // show bars
  svg.append("g")
    .selectAll("g")
    // enter data by lopping thru groups
    .data(data)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });

})
