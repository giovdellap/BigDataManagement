import { Component } from '@angular/core';
import { PlotFactory } from '../../../graphFactory/plotFactory';
import { models } from '../../../model/graphSettings/xaxisgenerations';
import { ApiService } from '../../../services/api.service';
import { LinechartService } from '../../../services/linechart.service';
import { NoSanitizePipe } from '../../../utils/nosanitizerpipe';

@Component({
  selector: 'app-multiple-linechart',
  standalone: true,
  imports: [
    NoSanitizePipe
  ],
  templateUrl: './multiple-linechart.component.html',
  styleUrl: './multiple-linechart.component.css'
})
export class MultipleLinechartComponent {

  models = models.slice(1)
  svgArray: any[] = [{}, {}, {}, {}]
  factory = new PlotFactory(700, 450)
  xAxis: string
  yAxis: string

  constructor(
    private apiService: ApiService,
    private linechartService: LinechartService
  ) {
    console.log('MULTIPLE COMPONENT')
    this.xAxis = linechartService.getXAxis()
    this.yAxis = linechartService.getYAxis()
  }

  ngOnInit(): void {

    this.loadGraphs()
    this.linechartService.getXAxisObservable().subscribe((x: string) => {
      this.xAxis = x
      this.loadGraphs()
    })
    this.linechartService.getYAxisObservable().subscribe((y: string) => {
      this.yAxis = y
      this.loadGraphs()
    })
    this.linechartService
    this.apiService.getObservable().subscribe(() => this.loadGraphs())
  }

  loadGraphs() {
    for (let i = 0; i < this.svgArray.length; i++) {
      this.getGraph(i)
    }
  }

  getGraph(graph_id: number) {
    this.apiService.getLineChartQuery(this.xAxis, this.yAxis, this.models[graph_id]).subscribe(res => {
      //console.log('GET GRAPH 1')
      this.svgArray[graph_id] = this.factory.getLineChart(res, this.xAxis, this.yAxis).outerHTML
      //console.log('GET GRAPH 2')
    })
  }
}
