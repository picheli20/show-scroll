import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getShows } from 'src/app/store/selectors/show.selector';
import { ShowApiService } from './show-api.service';

describe('ShowApiService', () => {
  let service: ShowApiService;
  let httpMock: HttpTestingController;
  let store: MockStore;

  const mockShows = [
    { id: 1, name: 'Show 1' },
    { id: 2, name: 'Show 2' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ShowApiService,
        provideMockStore({
          selectors: [
            { selector: getShows, value: mockShows }
          ]
        })
      ]
    });

    service = TestBed.inject(ShowApiService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load shows', () => {
    service.load().subscribe(shows => {
      expect(shows.length).toBe(2);
      expect(shows).toEqual(mockShows as any);
    });

    const req = httpMock.expectOne('https://api.tvmaze.com/shows');
    expect(req.request.method).toBe('GET');
    req.flush(mockShows);
  });

  it('should load one (same as load)', () => {
    service.loadOne().subscribe(shows => {
      expect(shows.length).toBe(2);
    });

    const req = httpMock.expectOne('https://api.tvmaze.com/shows');
    expect(req.request.method).toBe('GET');
    req.flush(mockShows);
  });

  it('should search shows', () => {
    const searchResults = [{ show: mockShows[0] }];

    service.search('test').subscribe(results => {
      expect(results.length).toBe(1);
    });

    const req = httpMock.expectOne('https://api.tvmaze.com/search/shows?q=test');
    expect(req.request.method).toBe('GET');
    req.flush(searchResults);
  });

  it('should return show from store if available', (done) => {
    service.detail('1').subscribe(show => {
      expect(show).toEqual(mockShows[0] as any);
      done();
    });

    httpMock.expectNone('https://api.tvmaze.com/shows/1');
  });

  it('should fetch show from API if not in store', () => {
    service.detail('3').subscribe(show => {
      expect(show.id).toBe(3);
    });

    const req = httpMock.expectOne('https://api.tvmaze.com/shows/3');
    expect(req.request.method).toBe('GET');
    req.flush({ id: 3, name: 'Show 3' });
  });
});
