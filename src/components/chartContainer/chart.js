import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const formatTime = d3.timeFormat("%b-%d");

const LineChart = ({ data, width, height, behaviors, between }) => {
  const svgRef = useRef();
  
  useEffect(() => {
    if (!behaviors) return;

    if (data.length === 0) return;

    d3.select(svgRef.current)
      .selectAll("*")
      .remove();

    let v_datas = [],
      filtered = [];

    if (between) {
      for (let i = 0; i < data.length; i++) {
        filtered = data[i].behaviorData
          .filter(d => d.date >= between.fromDate && d.date <= between.toDate)
          .sort((a, b) => (a.date < b.date ? -1 : 0));
        v_datas.push(filtered);
      }
    } else return;

    const margin = { top: 10, right: 20, bottom: 30, left: 50 },
      w = width - margin.left - margin.right,
      h = height - margin.top - margin.bottom;

    let averScores = [];

    for (let i = 0; i < v_datas.length; i++) {
      if (v_datas[i].length === 0) return;

      //just add for visualization
      v_datas[i].unshift({
        date: v_datas[i][0].date - 48 * 60 * 60 * 1000,
        score: null,
        clr: v_datas[i][0].clr
      });
      v_datas[i].push({
        date: v_datas[i][v_datas[i].length - 1].date + 24 * 60 * 60 * 1000,
        score: null,
        clr: v_datas[i][0].clr
      });
      averScores[i] = d3.mean(v_datas[i].map(d => d.score)).toFixed(1);
    }

    let sum = [];

    for (let i = 0; i < v_datas.length; i++) {
      sum.push(...v_datas[i].map(d => d.date));
    }

    const minDate = Math.min(...sum),
      maxDate = Math.max(...sum);

    const x = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .rangeRound([0, w]);

    const svg = d3
      .select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0, ${h})`)
      .call(
        d3
          .axisBottom(x)
          .tickSize(-h)
          .ticks(6)
      );

    xAxis.select(".domain").attr("stroke", "#e9ebf1");
    xAxis
      .selectAll(".tick")
      .select("text")
      .attr("clr", "#9aa1a9")
      .attr("dy", 15)
      .text(d => formatTime(d));
    xAxis
      .selectAll(".tick")
      .select("line")
      .attr("stroke", "#e9ebf1");

    const y = d3
      .scaleLinear()
      .domain([0, 10])
      .range([h, 0]);

    const yAxis = svg.append("g").call(
      d3
        .axisLeft(y)
        .ticks(5)
        .tickSize(-w)
    );

    yAxis.select(".domain").attr("stroke", "#e9ebf1");
    yAxis
      .selectAll(".tick")
      .select("text")
      .attr("clr", "#9aa1a9");
    yAxis
      .selectAll(".tick")
      .select("line")
      .attr("stroke", "#e9ebf1");

    for (let i = 0; i < v_datas.length; i++) {
      //append average score tag and dot line
      svg
        .append("rect")
        .attr("x", -40)
        .attr("y", y(averScores[i]) - 7.5)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("width", 30)
        .attr("height", 15)
        .attr("fill", v_datas[i][0].clr);

      svg
        .append("text")
        .attr("x", -25)
        .attr("y", y(averScores[i]) + 3)
        .attr("text-anchor", "middle")
        .attr("font-size", 10)
        .attr("fill", "#fff")
        .text(averScores[i]);

      svg
        .append("path")
        .datum(v_datas[i])
        .attr("fill", "none")
        .attr("stroke", d => d[0].clr)
        .attr("stroke-width", 1)
        .style("stroke-dasharray", "6, 3")
        .attr(
          "d",
          d3
            .line()
            .x(d => x(d.date))
            .y(d => y(averScores[i]))
        )
        .attr("cursor", "pointer")
        .on("mouseover", (d, i) => {
          // svg
          //   .append("rect")
          //   .attr("class", "tooltipRect")
          //   .attr("x", d3.event.pageX - 82)
          //   .attr("y", y(averScores[i]) - 20)
          //   .attr("rx", 3)
          //   .attr("ry", 3)
          //   .attr("width", 50)
          //   .attr("height", 15)
          //   .attr("fill", clrList[i]);
          // svg
          //   .append("text")
          //   .attr("class", "tooltipText")
          //   .attr("x", d3.event.pageX - 82 + 25)
          //   .attr("y", y(averScores[i]) - 8.5)
          //   .attr("text-anchor", "middle")
          //   .attr("font-size", 10)
          //   .attr("fill", "#fff")
          //   .text(averScores[i]);
        })
        .on("mouseout", (d, i) => {
          // svg.selectAll(".tooltipRect").remove();
          // svg.selectAll(".tooltipText").remove();
        });
      
      //append score viewData
      svg
        .append("path")
        .datum(v_datas[i])
        .attr("fill", "none")
        .attr("stroke", d => d[0].clr)
        .attr("stroke-width", 2)
        .attr(
          "d",
          d3
            .line()
            .defined(function(d) {
              return d.score !== null;
            })
            .x(d => x(d.date))
            .y(d => y(d.score))
        );

      svg
        .selectAll(".circles")
        .data(v_datas[i].filter(d => d.score))
        .enter()
        .append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.score))
        .attr("r", 5)
        .attr("fill", d => d.clr)
        .attr("cursor", "pointer")
        .on("mouseover", (d, i) => {
          // svg
          //   .append("rect")
          //   .attr("class", "tooltipRect")
          //   .attr("x", x(d.date))
          //   .attr("y", y(d.score) - 20)
          //   .attr("rx", 3)
          //   .attr("ry", 3)
          //   .attr("width", 50)
          //   .attr("height", 15)
          //   .attr("fill", clrList[i]);
          // svg
          //   .append("text")
          //   .attr("class", "tooltipText")
          //   .attr(
          //     "x",
          //     x(
          //       parseInt(d.date / (24 * 60 * 60)) * 24 * 60 * 60 -
          //         offset * 60 * 60
          //     ) + 25
          //   )
          //   .attr("y", y(d.score) - 10)
          //   .attr("text-anchor", "middle")
          //   .attr("font-size", 10)
          //   .attr("fill", "#fff")
          //   .text("(" + formatTime(d.date) + ":" + d.score + ")");
        })
        .on("mouseout", d => {
          // svg.selectAll(".tooltipText").remove();
          // svg.selectAll(".tooltipRect").remove();
        });
    }
  }, [data, width, height, behaviors, between]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default LineChart;
