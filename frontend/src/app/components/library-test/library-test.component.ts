import { Component } from '@angular/core';
import { BarComponent } from "../bar/bar.component";

@Component({
    selector: 'app-library-test',
    standalone: true,
    templateUrl: './library-test.component.html',
    styleUrl: './library-test.component.css',
    imports: [BarComponent]
})
export class LibraryTestComponent {

}
