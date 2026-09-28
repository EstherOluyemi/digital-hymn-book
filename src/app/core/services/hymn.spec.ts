import { TestBed } from '@angular/core/testing';
import { Hymn } from './hymn';

describe('Hymn', () => {
  let service: Hymn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hymn);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
