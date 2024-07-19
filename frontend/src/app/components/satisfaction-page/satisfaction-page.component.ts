import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GraphFactory } from '../../graphFactory/graphfactory';
import { getMaxCount } from '../../graphFactory/graphUtils';
import { models, satisfactionSettings, XAxisSatisfaction } from '../../model/graphSettings/xaxissatisfaction';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-satisfaction-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './satisfaction-page.component.html',
  styleUrl: './satisfaction-page.component.css'
})
export class SatisfactionPageComponent implements OnInit{

  optionControl = new FormControl()
  modelControl = new FormControl()

  options: XAxisSatisfaction[] = satisfactionSettings
  models = models

  factory = new GraphFactory(1000, 600)

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.optionControl.setValue(this.options[0])
    this.modelControl.setValue(this.models[0])
    this.factory.createSvg('scatter')
    this.getGraph(this.options[0], this.models[0])
    this.optionControl.valueChanges.subscribe(() => this.controlValueChanges())
    this.modelControl.valueChanges.subscribe(() => this.controlValueChanges())
    this.apiService.getObservable().subscribe(() => this.controlValueChanges())
  }

  controlValueChanges() {
    this.factory.removeSvg('scatter')
      this.getGraph(this.optionControl.value, this.modelControl.value)
  }

  getGraph(option: XAxisSatisfaction, model: string) {
    this.apiService.getBasicQuery('satisfaction', option.value, model).subscribe(res => {
      //this.factory.createSvg('scatter')
      this.factory.addXAxis(option.type, option.domain)
      this.factory.addYAxis('linear', [0, 6])
      this.factory.addRAxis([1, getMaxCount(res)], option.maxRay)
      this.factory.colorGrid()
      this.factory.addXAxisTitle(option.value)
      this.factory.addYAxisTitle('satisfaction')
      this.factory.addVariableScatterplotDots(res, option.value, 'satisfaction')
      this.factory.addScatterplotDimensionLegend()

    })
  }
}
