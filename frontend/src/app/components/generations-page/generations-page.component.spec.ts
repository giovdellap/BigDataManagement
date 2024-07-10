import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationsPageComponent } from './generations-page.component';

describe('GenerationsPageComponent', () => {
  let component: GenerationsPageComponent;
  let fixture: ComponentFixture<GenerationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerationsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
