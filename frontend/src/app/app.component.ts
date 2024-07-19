import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatButtonModule,
    RouterLink,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'frontend';

  options = ['influx', 'cassandra']
  dbControl: FormControl
  db: string

  constructor(private apiService: ApiService) {
    this.db = this.apiService.getDB()
    this.dbControl = new FormControl(this.db)
  }

  ngOnInit(): void {
    this.dbControl.valueChanges.subscribe((res: string) => {
      this.apiService.setDB(res)
    })
  }
}
