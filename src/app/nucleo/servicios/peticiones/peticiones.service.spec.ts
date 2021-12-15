import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RequestService } from './peticiones.service';
import { RequestServiceOptions } from 'src/app/core/services/request/request.service';
import { HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

const respuestaMock = {
  campo1: 'campo1',
  campo2: 2
};

describe('RequestService', () => {
  let requestService: RequestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule]
    }).compileComponents();
    requestService = TestBed.inject(RequestService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // to make sure that there are no outstanding requests
  });

  it('should create the service', () => {
    expect(requestService).toBeTruthy();
  });

  it('sholud create object httpRequest', () => {
    let httpRequest: HttpRequest<any>;
    const requestServiceOptionMock: RequestServiceOptions = {
      url: 'https://test',
      method: 'POST',
      headers: new HttpHeaders('test'),
      reportProgress: true,
      params: new HttpParams(),
      responseType: 'json',
      withCredentials: true
    };

    // @ts-ignore
    httpRequest = requestService.buildHttRequestObjectFromRequestServiceOptions(requestServiceOptionMock);
    expect(httpRequest.url).toEqual(requestServiceOptionMock.url);
    expect(httpRequest.method).toEqual(requestServiceOptionMock.method);
    expect<any>(httpRequest.headers).toEqual(requestServiceOptionMock.headers);
    expect<any>(httpRequest.reportProgress).toEqual(requestServiceOptionMock.reportProgress);
    expect<any>(httpRequest.params).toEqual(requestServiceOptionMock.params);
    expect<any>(httpRequest.responseType).toEqual(requestServiceOptionMock.responseType);
    expect<any>(httpRequest.withCredentials).toEqual(requestServiceOptionMock.withCredentials);
  });

  it('should get a response with status 200', () => {
    const rso: RequestServiceOptions = {
      responseType: 'json',
      method: 'GET',
      url: '/direcciondeprueba',
      headers: new HttpHeaders({ test: 'test' })
    };

    requestService.request(rso).subscribe((res) => {
      expect(res.body).toEqual(respuestaMock);
      expect(res.status).toEqual(200);
    });

    const req = httpTestingController.expectOne(rso.url);

    expect(req.request.url).toBe(rso.url);
    expect(req.request.method).toBe(rso.method);

    req.flush(respuestaMock);
  });

  it('should fail with 400', () => {
    const emsg = 'deliberate 400 error';
    const rso: RequestServiceOptions = {
      responseType: 'json',
      method: 'GET',
      url: '/direcciondeprueba'
    };

    requestService.request(rso).subscribe(
      (res) => fail('should have failed with the 400 error'),
      (err) => {
        expect(err.error).toBe(emsg);
        expect(err.status).toBe(400);
      }
    );

    const req = httpTestingController.expectOne(rso.url);
    expect(req.request.url).toBe(rso.url);
    req.flush(emsg, { status: 400, statusText: 'Bad Request' });
  });
});
