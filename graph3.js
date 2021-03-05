// plots third graph

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 100},
    width = 1400 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg3 = d3.select("#viz3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// parse
d3.csv("5a table 3 - Sheet3.csv", function(data) {

  // list of subgroups, slice csv header
  var subgroups = data.columns.slice(1)

  // list of groups pulled from column and shown on x axis
  var groups = d3.map(data, function(d){return(d.group)}).keys()

  // x axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg3.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0));

  // y axis
  var y = d3.scaleLinear()
    .domain([0, 2500000000])
    .range([height, 0]);
  svg3.append("g")
    .call(d3.axisLeft(y));

  // subgroup position scale
  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8','#4daf4a'])

  // Show the bars
  svg3.append("g")
    .selectAll("g")
    // add in data by looping thru groups
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
