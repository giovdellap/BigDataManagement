import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlotFactory } from '../../graphFactory/plotFactory';
import { models } from '../../model/models';
import { LinechartService } from '../../services/linechart.service';
import { NoSanitizePipe } from "../../utils/nosanitizerpipe";
import { MultipleLinechartComponent } from "../linechart/multiple-linechart/multiple-linechart.component";
import { SingleLinechartComponent } from "../linechart/single-linechart/single-linechart.component";

@Component({
  selector: 'app-linechart-container',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    NoSanitizePipe,
    CommonModule,
    MatRadioModule,
    SingleLinechartComponent,
    MultipleLinechartComponent,
    MatButtonModule,
    MatCardModule
],
  templateUrl: './linechart-container.component.html',
  styleUrl: './linechart-container.component.css'
})
export class LinechartContainerComponent implements OnInit{

  models = models.slice(1)
  // multiple = true => 4 grafici
  multiple = false;
  multipleEmitter = new BehaviorSubject<boolean>(this.multiple)
  multipleObservable: Observable<boolean>
  notMultipleEmitter = new BehaviorSubject<boolean>(!this.multiple)
  notMultipleObservable: Observable<boolean>


  //FILTER CONTROL
  xAxisOptions = ['satisfaction', 'generations']
  xAxis: string = this.xAxisOptions[0]
  xAxisControl = new FormControl<string>(this.xAxis)

  yAxisOptions = ['tokens', 'wli']
  yAxis: string = this.yAxisOptions[0]
  yAxisControl = new FormControl<string>(this.yAxis)

  svgArray: any[] = [{}, {}, {}, {}]
  svg: any
  factory = new PlotFactory(700, 450)

  constructor(private linechart: LinechartService) {
    console.log('1')
    this.multipleObservable = this.multipleEmitter.asObservable()
    this.notMultipleObservable = this.notMultipleEmitter.asObservable()
    console.log('2')
  }

  ngOnInit(): void {
    console.log('3')
    this.multipleObservable.subscribe(x => console.log('OBSERVABLE: ', x))
    this.notMultipleObservable.subscribe(x => console.log('NOT OBSERVABLE', x))
    this.xAxisControl.valueChanges.subscribe((x: any) => {
      this.xAxis = x
      this.linechart.setXAxis(x)
    })
    this.yAxisControl.valueChanges.subscribe((y: any) => {
      this.yAxis = y
      this.linechart.setYAxis(y)
    })
      }

  changeMultiple() {
    this.multiple = !this.multiple
    this.multipleEmitter.next(this.multiple)
    this.notMultipleEmitter.next(!this.multiple)
  }

}
