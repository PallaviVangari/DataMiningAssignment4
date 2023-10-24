// Load the data from the CSV
d3.csv('sample_data/shopping_trends.csv').then(function(data) {
    
    // Extract age and purchase amount data and convert to numbers
    let scatterData = data.map(d => ({age: +d.Age, purchaseAmount: +d['Purchase Amount (USD)'] }));

    // Setting up the SVG canvas dimensions
    const width = 600;
    const height = 400;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};

    // Selecting the SVG element
    let svg = d3.select('#scatter-plot')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Setting up the x-axis scale
    let x = d3.scaleLinear()
        .domain([0, d3.max(scatterData, d => d.age)])
        .range([0, width]);

    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    // Setting up the y-axis scale
    let y = d3.scaleLinear()
        .domain([0, d3.max(scatterData, d => d.purchaseAmount)])
        .range([height, 0]);

    svg.append('g')
        .call(d3.axisLeft(y));

    // Drawing the scatter plot
    svg.append('g')
        .selectAll('dot')
        .data(scatterData)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.age))
        .attr('cy', d => y(d.purchaseAmount))
        .attr('r', 3)
        .attr('fill', '#69b3a2');
});
