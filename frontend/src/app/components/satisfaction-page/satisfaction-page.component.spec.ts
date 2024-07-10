import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionPageComponent } from './satisfaction-page.component';

describe('SatisfactionPageComponent', () => {
  let component: SatisfactionPageComponent;
  let fixture: ComponentFixture<SatisfactionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatisfactionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SatisfactionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
