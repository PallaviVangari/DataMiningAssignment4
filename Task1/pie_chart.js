// Load the data from the CSV
d3.csv('sample_data/shopping_trends.csv').then(function(data) {
    
    // Count occurrences for each gender
    let genderCounts = {};
    data.forEach(d => {
        genderCounts[d.Gender] = (genderCounts[d.Gender] || 0) + 1;
    });
    let genderEntries = Object.entries(genderCounts);

    // Setting up the SVG canvas dimensions
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Selecting the SVG element
    let svg = d3.select('#pie-chart')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // Setting up the pie chart layout
    let pie = d3.pie().value(d => d[1]);
    let data_ready = pie(genderEntries);

    // Setting up the color scale
    let color = d3.scaleOrdinal()
        .domain(genderEntries.map(d => d[0]))
        .range(d3.schemeSet2);

    // Drawing the pie chart
    svg.selectAll('slices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill', d => color(d.data[0]))
        .attr('stroke', 'white')
        .style('stroke-width', '2px');
});
