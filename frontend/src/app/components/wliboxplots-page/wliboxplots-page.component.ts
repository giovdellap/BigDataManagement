import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GraphFactory } from '../../graphFactory/graphfactory';
import { models } from '../../model/graphSettings/xaxissatisfaction';
import { wliboxplotsettings, YAxisBoxPlot } from '../../model/graphSettings/yaxiswliboxplot';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-wliboxplots-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './wliboxplots-page.component.html',
  styleUrl: './wliboxplots-page.component.css'
})
export class WliboxplotsPageComponent implements OnInit {

  optionControl = new FormControl()
  modelControl = new FormControl()

  options: YAxisBoxPlot[] = wliboxplotsettings
  models = models

  factory = new GraphFactory(1000, 600)

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.optionControl.setValue(this.options[0])
    this.modelControl.setValue(this.models[0])
    this.factory.createSvg('scatter')
    console.log('oninit 1')
    this.getGraph(this.options[0], this.models[0])
    console.log('oninit 2')
    this.optionControl.valueChanges.subscribe(() => this.controlValueChanges())
    this.modelControl.valueChanges.subscribe(() => this.controlValueChanges())
  }

  controlValueChanges() {
    this.factory.removeSvg('scatter')
    this.getGraph(this.optionControl.value, this.modelControl.value)
  }

  getGraph(option: YAxisBoxPlot, model: string) {
    this.apiService.getBasicQuery('generations', option.value, model).subscribe(res => {
      //this.factory.createSvg('scatter')
      this.factory.addXAxis(option.type, option.domain)
      this.factory.addYAxis('linear', [0, 10])
      this.factory.colorGrid()
      this.factory.addXAxisTitle(option.value)
      this.factory.addYAxisTitle('generations')
      //if(option.value === "tokens") {
      //  this.factory.addBasicScatterplotDots(res, option.value, 'satisfaction')
      //} else {
      //  this.factory.addVariableScatterplotDots(res, option.value, 'satisfaction', getMaxCount(res))
      //}
      this.factory.addVariableScatterplotDots(res, option.value, 'generations')
      this.factory.addScatterplotDimensionLegend()

    })
  }
}
