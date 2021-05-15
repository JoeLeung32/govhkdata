import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangelogIndexComponent } from './changelog-index.component';

describe('ChangelogIndexComponent', () => {
  let component: ChangelogIndexComponent;
  let fixture: ComponentFixture<ChangelogIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangelogIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangelogIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
