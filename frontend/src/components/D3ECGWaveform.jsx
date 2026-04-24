import { useRef, useEffect } from "react";
import * as d3 from "d3";

function D3ECGWaveform({ signal, color = "#00e676", height = 160 }) {
  const svgRef = useRef(null);
  const prevSignalRef = useRef([]);

  useEffect(() => {
    if (!signal || signal.length === 0) return;

    const svg = d3.select(svgRef.current);
    const container = svgRef.current.parentElement;
    if (!container) return;
    const width = container.clientWidth || 600;

    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const xScale = d3.scaleLinear().domain([0, signal.length - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([-0.4, 1.2]).range([height - 8, 8]);

    // Defs: gradient + glow filter
    const defs = svg.append("defs");

    const grad = defs.append("linearGradient")
      .attr("id", "ecg-stroke-grad")
      .attr("x1", "0%").attr("x2", "100%");
    grad.append("stop").attr("offset", "0%").attr("stop-color", color).attr("stop-opacity", 0.2);
    grad.append("stop").attr("offset", "15%").attr("stop-color", color).attr("stop-opacity", 1);
    grad.append("stop").attr("offset", "85%").attr("stop-color", color).attr("stop-opacity", 1);
    grad.append("stop").attr("offset", "100%").attr("stop-color", color).attr("stop-opacity", 0.2);

    const glowFilter = defs.append("filter").attr("id", "ecg-glow");
    glowFilter.append("feGaussianBlur").attr("stdDeviation", "2").attr("result", "blur");
    const merge = glowFilter.append("feMerge");
    merge.append("feMergeNode").attr("in", "blur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    // Grid lines (faint)
    const gridGroup = svg.append("g").attr("class", "grid");
    for (let i = 0; i < 20; i++) {
      const x = (width / 20) * i;
      gridGroup.append("line")
        .attr("x1", x).attr("x2", x)
        .attr("y1", 0).attr("y2", height)
        .attr("stroke", "rgba(255,255,255,0.03)")
        .attr("stroke-width", 0.5);
    }
    for (let j = 0; j < 6; j++) {
      const y = (height / 6) * j;
      gridGroup.append("line")
        .attr("x1", 0).attr("x2", width)
        .attr("y1", y).attr("y2", y)
        .attr("stroke", "rgba(255,255,255,0.03)")
        .attr("stroke-width", 0.5);
    }

    // Baseline reference line
    svg.append("line")
      .attr("x1", 0).attr("x2", width)
      .attr("y1", yScale(0)).attr("y2", yScale(0))
      .attr("stroke", "rgba(255,255,255,0.06)")
      .attr("stroke-width", 0.5)
      .attr("stroke-dasharray", "4 4");

    // Area fill
    const areaGen = d3.area()
      .x((d, i) => xScale(i))
      .y0(yScale(0))
      .y1(d => yScale(d))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(signal)
      .attr("d", areaGen)
      .attr("fill", color)
      .attr("fill-opacity", 0.06);

    // ECG Line
    const lineGen = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    // Glow layer (behind)
    svg.append("path")
      .datum(signal)
      .attr("d", lineGen)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 4)
      .attr("stroke-opacity", 0.15)
      .attr("filter", "url(#ecg-glow)");

    // Main line
    svg.append("path")
      .datum(signal)
      .attr("d", lineGen)
      .attr("fill", "none")
      .attr("stroke", "url(#ecg-stroke-grad)")
      .attr("stroke-width", 2)
      .attr("stroke-linecap", "round");

    // Scanning dot at latest point
    const lastIdx = signal.length - 1;
    const lastVal = signal[lastIdx];

    svg.append("circle")
      .attr("cx", xScale(lastIdx))
      .attr("cy", yScale(lastVal))
      .attr("r", 4)
      .attr("fill", color)
      .attr("filter", "url(#ecg-glow)");

    svg.append("circle")
      .attr("cx", xScale(lastIdx))
      .attr("cy", yScale(lastVal))
      .attr("r", 2)
      .attr("fill", "#fff");

    prevSignalRef.current = signal;

  }, [signal, color, height]);

  return (
    <svg
      ref={svgRef}
      style={{ display: "block", overflow: "visible", width: "100%", borderRadius: "8px" }}
    />
  );
}

export default D3ECGWaveform;
