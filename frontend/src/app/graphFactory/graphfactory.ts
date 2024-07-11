import * as d3 from 'd3';
import { createAxis, getDotRay } from './graphUtils';

export class GraphFactory {
  private svg: any;
  private x: any;
  private y: any;
  private margin = 40;
  private width
  private height

  constructor(width: number, height: number) {
    this.width = width - (this.margin * 2)
    this.height = height - (this.margin * 2)
  }

  public removeSvg(id: string): void {
    this.svg.selectAll("*").remove();  }

  public createSvg(id: string): void {
    this.svg = d3.select("figure#" + id)
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  public addXAxis(type: string, domain: number[]) {
    this.x = createAxis(type, domain, [0, this.width])
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(this.x)
      .tickSize(-this.height)
    );
  }

  public addYAxis(type: string, domain: number[]) {
    this.y = createAxis(type, domain, [this.height, 0])
    this.svg.append("g")
    .call(d3.axisLeft(this.y)
      .tickSize(-this.width)
    );
  }

  public colorGrid() {
    this.svg.selectAll(".tick line")
    .attr("stroke","#C7C7C7");
  }

  public addXAxisTitle(value: string) {
    this.svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", this.width)
    .attr("y", this.height + (this.margin / 2))
    .text(value);
  }

  public addYAxisTitle(value:string) {
    this.svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", - (this.margin/2) )
    .attr("x", 0)
    .text(value)
  }

  public addBasicScatterplotDots(data: any, x_value: string, y_value:string) {
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => this.x(d[x_value]))
    .attr("cy",  (d: any) => this.y(d[y_value]))
    .attr("r", 1)
    .style("opacity", 1)
    .style("fill", "#69b3a2");
  }

  public addVariableScatterplotDots(data: any, x_value: string, y_value: string, total: number) {
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => this.x(d[x_value]))
    .attr("cy",  (d: any) => this.y(d[y_value]))
    .attr("r", (d: any) => getDotRay(d.count, total))
    .style("opacity", 1)
    .style("fill", "#69b3a2");
  }
}
