import * as d3 from "d3";
import { createProps } from "./features/createProps";
import { createSVGElem } from "./features/usefulMethods";

import "./style.css";

var qlik = window.require("qlik");

export default function paint($element, layout) {
  console.log("Layout", layout);

  /* CREATE DATA */
  var hc = layout.qHyperCube,
    mat = hc.qDataPages[0].qMatrix,
    measures = hc.qMeasureInfo.map((meas) => meas.qFallbackTitle),
    sumMeas0 = [],
    sumMeas1 = [];

  const data = mat.map((item) => {
    let temp = {};
    temp["group"] = item[0].qText;
    temp[measures[0]] = item[1].qNum;
    temp[measures[1]] = item[2].qNum;

    sumMeas0.push(item[1].qNum);
    sumMeas1.push(item[2].qNum);

    return temp;
  });
  //   console.table(data);

  /* MANAGE PROPS */
  const allProps = createProps(layout);
//   console.log("allProps", allProps);

  /* INITIAL STUFFS */
  const elementId = "DYA_" + layout.qInfo.qId,
    containerWidth = $element.width(),
    containerHeight = $element.height();

  var margin = {
      top: 10,
      right: 35,
      bottom: 15,
      left: 35,
    },
    width = containerWidth - margin.left - margin.right,
    height = containerHeight - margin.top - margin.bottom;

  /* CREATE SVG */
  var svg = createSVGElem(elementId, width, height, margin);

  /* SCALES AND X/Y0/Y1 AXES */
  var groups = d3.map(data, (d) => d.group);
  var x = d3
      .scaleBand()
      .domain(groups)
      .range([0, width]) //margin.left, width - margin.right
      .padding([0.2]),
    xSubgroup = d3
      .scaleBand()
      .domain(measures)
      .range([0, x.bandwidth()])
      .padding([0.05]);
  var y0 = d3
      .scaleLinear()
      .rangeRound([height - margin.bottom, margin.top])
      .nice(),
    y1 = d3
      .scaleLinear()
      .rangeRound([height - margin.bottom, margin.top])
      .nice();

  y0.domain([0, Math.max(...sumMeas0)]).nice();
  y1.domain([0, Math.max(...sumMeas1)]).nice();

  // Append X, Y0, Y1 axes
  svg
    .append("g")
    .attr("class", "x")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g").attr("class", "y0").call(d3.axisLeft(y0));

  svg
    .append("g")
    .attr("class", "y1")
    .attr("transform", "translate( " + width + ", 0 )")
    .call(d3.axisRight(y1));

  // Manage colors
  var colors = [
    mat[0][1].qAttrExps.qValues[0].qText,
    mat[0][2].qAttrExps.qValues[0].qText,
  ];

  var color = d3
    .scaleOrdinal()
    .domain(measures)
    .range(!colors.includes(undefined) ? colors : ["green", "red"]);

  /* APPEND BARS */
  svg
    .append("g")
    .attr("class", "bars")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append("g")
    .attr("transform", (d) => "translate(" + x(d.group) + ",0)")
    .selectAll("rect")
    .data((d) =>
      measures.map((key) => {
        return { key: key, value: d[key] };
      })
    )
    .enter()
    .append("rect")
    .attr("x", (d) => xSubgroup(d.key))
    .attr("y", (d) => (d.key == measures[0] ? y0(d.value) : y1(d.value)))
    .attr("width", xSubgroup.bandwidth())
    .attr(
      "height",
      (d) =>
        height -
        margin.bottom -
        (d.key == measures[0] ? y0(d.value) : y1(d.value))
    )
    .attr("fill", (d) => color(d.key));
}
