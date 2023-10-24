// Load the data from the CSV
d3.csv('sample_data/shopping_trends.csv').then(function(data) {
    
    // Extract age data and count occurrences for each age
    let ageCounts = {};
    data.forEach(d => {
        ageCounts[d.Age] = (ageCounts[d.Age] || 0) + 1;
    });
    let ageEntries = Object.entries(ageCounts);

    // Setting up the SVG canvas dimensions
    const width = 1000;
    const height = 400;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};

    // Selecting the SVG element
    let svg = d3.select('#bar-chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Setting up the x-axis scale
    let x = d3.scaleBand()
        .domain(ageEntries.map(d => d[0]))
        .range([0, width])
        .padding(0.2);

    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    // Setting up the y-axis scale
    let y = d3.scaleLinear()
        .domain([0, d3.max(ageEntries, d => d[1])])
        .range([height, 0]);

    svg.append('g')
        .call(d3.axisLeft(y));

    // Drawing the bars for the bar chart
    svg.selectAll('rect')
        .data(ageEntries)
        .enter()
        .append('rect')
        .attr('x', d => x(d[0]))
        .attr('y', d => y(d[1]))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d[1]))
        .attr('fill', '#69b3a2');
});
