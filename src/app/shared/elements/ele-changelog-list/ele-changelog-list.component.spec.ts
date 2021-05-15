import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleChangelogListComponent } from './ele-changelog-list.component';

describe('EleChangelogListComponent', () => {
  let component: EleChangelogListComponent;
  let fixture: ComponentFixture<EleChangelogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleChangelogListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleChangelogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
