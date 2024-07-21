import { Component } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { PlotFactory } from '../../../graphFactory/plotFactory';
import { models } from '../../../model/graphSettings/xaxisgenerations';
import { BasicQueryNoCountResponseItem } from '../../../model/queryresponses/basicQueryNoCountResponse';
import { ApiService } from '../../../services/api.service';
import { LinechartService } from '../../../services/linechart.service';
import { NoSanitizePipe } from "../../../utils/nosanitizerpipe";

@Component({
  selector: 'app-single-linechart',
  standalone: true,
  imports: [NoSanitizePipe],
  templateUrl: './single-linechart.component.html',
  styleUrl: './single-linechart.component.css'
})
export class SingleLinechartComponent {

  svg: any
  factory = new PlotFactory(700, 450)
  xAxis: string
  yAxis: string

  constructor(
    private apiService: ApiService,
    private linechartService: LinechartService
  ) {
    console.log('SINGLE COMPONENT')
    this.xAxis = linechartService.getXAxis()
    this.yAxis = linechartService.getYAxis()
  }

  ngOnInit(): void {

    this.getGraph()
    this.linechartService.getXAxisObservable().subscribe((x: string) => {
      this.xAxis = x
      this.getGraph()
    })
    this.linechartService.getYAxisObservable().subscribe((y: string) => {
      this.yAxis = y
      this.getGraph()
    })
    this.linechartService
    this.apiService.getObservable().subscribe(() => this.getGraph())
  }

  getGraph() {
    let observables = []
    for (let i = 0; i < models.length; i++) {
      observables.push(
        this.apiService.getLineChartQuery(this.xAxis, this.yAxis, models[i]).pipe(
          map((x: BasicQueryNoCountResponseItem[]) => {
            //console.log('X: ', x)
            for (let j = 0; j < x.length; j++) {
              x[j].model = models[i]
            }
            return x
          })
        ))
    }
    forkJoin(observables).subscribe((res: any[]) => {
      //console.log('FORKJOIN: ',res)
      let result: BasicQueryNoCountResponseItem[] = []
      for (let i = 0; i < res.length; i++) {
        result = result.concat(res[i])
      }
      this.svg = this.factory.getColoredLineChart(result, this.xAxis, this.yAxis).outerHTML
    })
  }

}
