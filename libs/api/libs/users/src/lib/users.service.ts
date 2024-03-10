import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@prisma/client';
import { ApiService } from '@simpler/api';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService<User> {
  protected readonly resource = 'users';
  constructor(protected readonly httpClient: HttpClient) {
    super();
  }
}
