import * as d3 from "d3";
export const createSVGElem = (elementId, width, height, margin) => {
  $("#" + elementId).empty();
  var extSvg = d3
    .select("#" + elementId)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  var svg = extSvg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "DYA")
    .attr("id", "DYA_" + elementId);

  return svg;
};
