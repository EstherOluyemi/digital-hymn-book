import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HymnDetails } from './hymn-details';

describe('HymnDetails', () => {
  let component: HymnDetails;
  let fixture: ComponentFixture<HymnDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HymnDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(HymnDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
