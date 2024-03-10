import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
class MockService extends ApiService {
  protected readonly resource = 'mock-resource';
  constructor(protected readonly httpClient: HttpClient) {
    super();
  }
}

describe('ApiService', () => {
  let spectator: SpectatorHttp<MockService>;

  const createHttp = createHttpFactory({
    service: MockService,
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('findOne', () => {
    it('should call http get', () => {
      spectator.service.findOne('entity-id').subscribe();
      spectator.expectOne(
        `${spectator.service['url']}/entity-id`,
        HttpMethod.GET
      );
    });
  });

  describe('findAll', () => {
    it('should call http get', () => {
      const args = { where: { id: 'some id' } };
      const params = '?args=%7B%22where%22:%7B%22id%22:%22some%20id%22%7D%7D';
      spectator.service.findAll(args).subscribe();
      spectator.expectOne(spectator.service['url'] + params, HttpMethod.GET);
    });
  });

  describe('create', () => {
    it('should call http post', () => {
      spectator.service.create({});
      const request = spectator.expectOne(
        spectator.service['url'],
        HttpMethod.POST
      );
      request.flush({});
    });
  });

  describe('update', () => {
    it('should call http patch', () => {
      spectator.service.update('entity-id', {});
      const request = spectator.expectOne(
        `${spectator.service['url']}/entity-id`,
        HttpMethod.PATCH
      );
      request.flush({});
    });
  });

  describe('delete', () => {
    it('should call http delete', () => {
      spectator.service.delete('entity-id');
      const request = spectator.expectOne(
        `${spectator.service['url']}/entity-id`,
        HttpMethod.DELETE
      );
      request.flush({});
    });
  });
});
