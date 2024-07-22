import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
import { GraphFactory } from '../../graphFactory/graphfactory';
import { getMaxCount } from '../../graphFactory/graphUtils';
import { XAxisScatterplot, xScatterplotSettings } from '../../model/graphSettings/xAxisScatterplot';
import { YAxisScatterplot, yScatterplotSettings } from '../../model/graphSettings/yAxisScatterplot';
import { models } from '../../model/models';
import { BasicQueryNoCountResponseItem } from '../../model/queryresponses/basicQueryNoCountResponse';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-scatterplot',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './scatterplot.component.html',
  styleUrl: './scatterplot.component.css'
})
export class ScatterplotComponent implements OnInit{

  xAxisOptions = xScatterplotSettings
  xAxis: XAxisScatterplot = this.xAxisOptions[0]
  xAxisControl = new FormControl<XAxisScatterplot>(this.xAxis)

  yAxisOptions = yScatterplotSettings
  yAxis: YAxisScatterplot = this.yAxisOptions[0]
  yAxisControl = new FormControl<YAxisScatterplot>(this.yAxis)

  models = models
  model = this.models[0]
  modelControl = new FormControl<string>(this.model)

  colored = true
  coloredEmitter = new BehaviorSubject<boolean>(this.colored)
  coloredObservable: Observable<boolean>

  factory = new GraphFactory(1200, 800)

  constructor(private apiService: ApiService) {
    this.coloredObservable = this.coloredEmitter.asObservable()
  }

  ngOnInit(): void {
    this.factory.createSvg('scatter')
    this.getGraph()
    this.xAxisControl.valueChanges.subscribe(() => this.valueChanges())
    this.yAxisControl.valueChanges.subscribe(() => this.valueChanges())
    this.modelControl.valueChanges.subscribe(() => this.valueChanges())
    this.apiService.getObservable().subscribe(() => this.valueChanges())
  }

  onClickColored() {
    this.colored = !this.colored
    this.coloredEmitter.next(this.colored)
    this.valueChanges()
  }

  valueChanges() {
    this.xAxis = this.xAxisControl.value || {} as XAxisScatterplot
    this.yAxis = this.yAxisControl.value || {} as YAxisScatterplot
    this.model = this.modelControl.value || ""
    this.factory.removeSvg('scatter')
    this.getGraph()
  }

  getGraph() {
    console.log('XAXIS: ', this.xAxis)
    console.log('YAXIS: ', this.yAxis)
    if(this.colored) {
      this.getColoredScatterplot()
    } else {
      this.getCountScatterplot()
    }
  }

  getCountScatterplot() {
    this.apiService.getBasicQuery(this.yAxis.value, this.xAxis.value, this.model).subscribe(res => {
      //this.factory.createSvg('scatter')
      console.log(res)
      this.factory.addXAxis(this.xAxis.type, this.xAxis.domain)
      this.factory.addYAxis(this.yAxis.type, this.yAxis.domain)
      this.factory.addRAxis([1, getMaxCount(res)], this.xAxis.maxRay)
      this.factory.colorGrid()
      this.factory.addXAxisTitle(this.xAxis.value)
      this.factory.addYAxisTitle(this.yAxis.value)
      this.factory.addVariableScatterplotDots(res, this.xAxis.value, this.yAxis.value)
      this.factory.addScatterplotDimensionLegend()
    })
  }

  getColoredScatterplot() {

    let observables = []
    let realModels = models.slice(1)
    for (let i = 0; i < realModels.length; i++) {
      observables.push(
        this.apiService.getBasicQueryNoCOunt(this.yAxis.value, this.xAxis.value, realModels[i]).pipe(
          map((x: BasicQueryNoCountResponseItem[]) => {
            //console.log('X: ', x)
            for (let j = 0; j < x.length; j++) {
              x[j].model = realModels[i]
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
      console.log(result)
      this.factory.addColoredBackground()
      this.factory.addXAxis(this.xAxis.type, this.xAxis.domain)
      this.factory.addYAxis(this.yAxis.type, this.yAxis.domain)
      this.factory.colorGrid()
      this.factory.addXAxisTitle(this.xAxis.value)
      this.factory.addYAxisTitle(this.yAxis.value)
      this.factory.addColoredScatterplotDots(result, this.xAxis.value, this.yAxis.value)
    })
  }


}
