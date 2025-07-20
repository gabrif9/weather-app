import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastTabEntryComponent } from './forecast-tab-entry.component';

describe('ForecastTabEntryComponent', () => {
  let component: ForecastTabEntryComponent;
  let fixture: ComponentFixture<ForecastTabEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastTabEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastTabEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
