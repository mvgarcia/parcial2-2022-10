import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const BarChart = ({ width = 600, height = 600, data_ }) => {

    const [data, setData] = useState([]);
    d3.json("url").then(data => {
        setData(data);
    });

    const ref = useRef();

    useEffect(() => {
        const margin = { top:10, left:50, bottom: 40, right: 10};
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top -margin.bottom;

        const svg = ref.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const y = d3.scaleLinear() 
            .domain([0, 30])
            .range([iheight, 0]);

        const x = d3.scaleBand()
        .domain(data.map(d => d.name) ) 
        .range([0, iwidth])
        .padding(0.1); 

        const bars = g.selectAll("rect").data(data);

        bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.height))
        .attr("height", d => iheight - y(d.height))
        .attr("width", x.bandwidth())  

        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  

        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));
    });

    return (
        <div id='chartBar'>
            <svg ref={ref}></svg>
        </div>
    );
};

export default BarChart;