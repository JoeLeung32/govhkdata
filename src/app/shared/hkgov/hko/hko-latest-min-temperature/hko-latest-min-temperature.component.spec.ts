import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HkoLatestMinTemperatureComponent } from './hko-latest-min-temperature.component';

describe('HkoLatestMinTemperatureComponent', () => {
  let component: HkoLatestMinTemperatureComponent;
  let fixture: ComponentFixture<HkoLatestMinTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HkoLatestMinTemperatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HkoLatestMinTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
