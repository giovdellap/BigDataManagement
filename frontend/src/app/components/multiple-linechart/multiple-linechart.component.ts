import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PlotFactory } from '../../graphFactory/plotFactory';
import { models } from '../../model/graphSettings/xaxisgenerations';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-multiple-linechart',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './multiple-linechart.component.html',
  styleUrl: './multiple-linechart.component.css'
})
export class MultipleLinechartComponent implements OnInit{

  models = models.slice(1)

  //FILTER CONTROL
  xAxisOptions = ['satisfaction', 'generations']
  xAxis: string = this.xAxisOptions[0]
  xAxisControl = new FormControl<string>(this.xAxis)

  yAxisOptions = ['tokens', 'wli']
  yAxis: string = this.yAxisOptions[0]
  yAxisControl = new FormControl<string>(this.yAxis)

  svgArray: any[] = [{}, {}, {}, {}]
  factory = new PlotFactory(700, 450)

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {

    this.loadGraphs()
    this.xAxisControl.valueChanges.subscribe(() => this.onValueChanges())
    this.yAxisControl.valueChanges.subscribe(() => this.onValueChanges())
    this.apiService.getObservable().subscribe(() => this.onValueChanges())
  }

  onValueChanges() {
    this.xAxis = this.xAxisControl.value || ""
    this.yAxis = this.yAxisControl.value || ""

  }

  loadGraphs() {
    for (let i = 0; i < this.svgArray.length; i++) {
      this.getGraph(i)
    }
  }

  getGraph(graph_id: number) {
    this.apiService.getBasicQueryNoCOunt(this.xAxis, this.yAxis, this.models[graph_id]).subscribe(res => {
      //this.factory.createSvg('scatter')
      console.log('GET GRAPH 1')
      this.svgArray[graph_id] = this.factory.getWLIBoxplot(res, option).outerHTML
      console.log('GET GRAPH 2')
    })
  }

}
