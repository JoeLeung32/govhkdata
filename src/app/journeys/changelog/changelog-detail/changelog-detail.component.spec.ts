import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangelogDetailComponent } from './changelog-detail.component';

describe('ChangelogDetailComponent', () => {
  let component: ChangelogDetailComponent;
  let fixture: ComponentFixture<ChangelogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangelogDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangelogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
