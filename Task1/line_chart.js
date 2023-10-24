// Load the data from the CSV
d3.csv('sample_data/shopping_trends.csv').then(function(data) {
    
    // Group data by age and calculate average purchase amount
    let ageMap = d3.group(data, d => d.Age);
    let lineData = Array.from(ageMap, ([key, value]) => ({ 
        age: key, 
        avgPurchase: d3.mean(value, d => +d['Purchase Amount (USD)'])
    }));

    // Setting up the SVG canvas dimensions
    const width = 600;
    const height = 400;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};

    // Selecting the SVG element
    let svg = d3.select('#line-chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Setting up the x-axis scale
    let x = d3.scaleLinear()
        .domain([0, d3.max(lineData, d => +d.age)])
        .range([0, width]);

    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    // Setting up the y-axis scale
    let y = d3.scaleLinear()
        .domain([0, d3.max(lineData, d => d.avgPurchase)])
        .range([height, 0]);

    svg.append('g')
        .call(d3.axisLeft(y));

    // Drawing the line chart
    svg.append('path')
        .datum(lineData)
        .attr('fill', 'none')
        .attr('stroke', '#69b3a2')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x(d => x(+d.age))
            .y(d => y(d.avgPurchase))
        );
});
