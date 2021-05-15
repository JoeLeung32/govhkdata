import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangelogCategoriesComponent } from './changelog-categories.component';

describe('ChangelogCategoriesComponent', () => {
  let component: ChangelogCategoriesComponent;
  let fixture: ComponentFixture<ChangelogCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangelogCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangelogCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
