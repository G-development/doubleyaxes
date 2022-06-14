import * as d3 from "d3";
import { createProps } from "./features/createProps";
import { createSVGElem } from "./features/usefulMethods";

import "./style.css";

var qlik = window.require("qlik");

export default function paint($element, layout) {
  console.log("Layout", layout);

  const data = [
    {
      group: "A",
      meas0: 3000,
      meas1: 3,
    },
    {
      group: "B",
      meas0: 2000,
      meas1: 0,
    },
    {
      group: "C",
      meas0: 5000,
      meas1: 9,
    },
    {
      group: "D",
      meas0: 1000,
      meas1: 2,
    },
  ];

  console.table(data);

  /* MANAGE PROPS */
  const allProps = createProps(layout);
  console.log("allProps", allProps);

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
    .padding([0.2]);
  var y0 = d3
      .scaleLinear()
      .rangeRound([height - margin.bottom, margin.top])
      .nice(),
    y1 = d3
      .scaleLinear()
      .rangeRound([height - margin.bottom, margin.top])
      .nice();

  y0.domain([0, 6000]).nice();
  y1.domain([0, 15]).nice();

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
}
