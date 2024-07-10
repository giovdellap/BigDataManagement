import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GraphFactory } from '../../graphFactory/graphfactory';
import { settings, XAxisOption } from '../../model/graphSettings/satisfactionscatterplotsettings';
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

  selectControl = new FormControl()
  options: XAxisOption[] = settings
  factory = new GraphFactory(750, 400)


  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.selectControl.setValue(this.options[0])
    this.factory.createSvg('scatter')
    this.getGraph(this.options[0])
    this.selectControl.valueChanges.subscribe(option => {
      this.factory.removeSvg('scatter')
      this.getGraph(option)
    })
  }


  getGraph(option: XAxisOption) {
    this.apiService.getTestQuery(option.value).subscribe(res => {
      //this.factory.createSvg('scatter')
      this.factory.addXAxis(option.type, option.domain)
      this.factory.addYAxis('linear', [0, 6])
      this.factory.addScatterplotDots(res, option.value, 'satisfaction')
    })
  }

}
