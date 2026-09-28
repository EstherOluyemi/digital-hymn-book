import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HymnLibrary } from './hymn-library';

describe('HymnLibrary', () => {
  let component: HymnLibrary;
  let fixture: ComponentFixture<HymnLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HymnLibrary],
    }).compileComponents();

    fixture = TestBed.createComponent(HymnLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
