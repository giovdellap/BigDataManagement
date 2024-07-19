import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GraphFactory } from '../../graphFactory/graphfactory';
import { getMaxCount } from '../../graphFactory/graphUtils';
import { loadingTimeSettings, XAxisLoadingTime } from '../../model/graphSettings/xaxisloadingtime';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-loadingtime-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './loadingtime-page.component.html',
  styleUrl: './loadingtime-page.component.css'
})
export class LoadingtimePageComponent implements OnInit{
  optionControl = new FormControl()

  options: XAxisLoadingTime[] = loadingTimeSettings

  factory = new GraphFactory(1000, 600)

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.optionControl.setValue(this.options[0])
    this.factory.createSvg('scatter')
    this.getGraph(this.options[0])
    this.optionControl.valueChanges.subscribe(() => this.controlValueChanges())
    this.apiService.getObservable().subscribe(() => this.controlValueChanges())
  }

  controlValueChanges() {
    this.factory.removeSvg('scatter')
    this.getGraph(this.optionControl.value)
  }

  getGraph(option: XAxisLoadingTime) {
    this.apiService.getBasicRequestQuery (option.value).subscribe(res => {
      //this.factory.createSvg('scatter')
      this.factory.addXAxis(option.type, option.domain)
      this.factory.addYAxis('linear', [0, 200])
      this.factory.addRAxis([1, getMaxCount(res)], option.maxRay)
      this.factory.colorGrid()
      this.factory.addXAxisTitle(option.value)
      this.factory.addYAxisTitle('loading time')
      this.factory.addVariableScatterplotDots(res, option.value, 'loading_time')
      this.factory.addScatterplotDimensionLegend()

    })
  }
}
