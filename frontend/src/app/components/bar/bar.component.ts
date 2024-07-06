import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { TestResponseItem } from '../../model/testResponseItem';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent implements OnInit {

  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private apiService: ApiService) {}

  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawPlot(data: TestResponseItem[]): void {
    // Add X axis - wli
    const x = d3.scaleLinear()
    .domain([0, 6])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x));

    // Add Y axis - satisfaction
    const y = d3.scaleLinear()
    .domain([0, 6])
    .range([ this.height, 0]);
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => x(d.wli))
    .attr("cy",  (d: any) => y(d.satisfaction))
    .attr("r", 1)
    .style("opacity", 1)
    .style("fill", "#69b3a2");

    // Add labels

  }
  ngOnInit(): void {
    this.apiService.getTestQuery().subscribe(res => {
      console.log(res)
      this.createSvg();
      console.log("1")
      this.drawPlot(res.result);
      console.log("2")
    })

  }

}
