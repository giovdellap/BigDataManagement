import { Component } from '@angular/core';
import { PlotFactory } from '../../../graphFactory/plotFactory';
import { ApiService } from '../../../services/api.service';
import { WeekdayService } from '../../../services/weekday.service';
import { NoSanitizePipe } from '../../../utils/nosanitizerpipe';

@Component({
  selector: 'app-single-weekday',
  standalone: true,
  imports: [NoSanitizePipe],
  templateUrl: './single-weekday.component.html',
  styleUrl: './single-weekday.component.css'
})
export class SingleWeekdayComponent {

  svg: any
  factory = new PlotFactory(1200, 800)

  constructor(
    private apiService: ApiService,
    private weekdayService: WeekdayService
  ) {
    console.log('MULTIPLE COMPONENT')

    this.apiService.getBasicRequestQueryNoCount('time').subscribe( res => {
      console.log(res)
      this.weekdayService.insertArray(res)
      this.weekdayService.generateSingleLinechartArray()
      this.svg = this.factory.getColoredLineChart(this.weekdayService.singleArray, this.xAxis, this.yAxis).outerHTML
    })

  }
}
