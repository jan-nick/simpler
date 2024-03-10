import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@simpler-env';
import { Auth, Credentials } from '@simpler/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly resource = 'auth';

  protected get url() {
    return `${environment.backendUrl}/${this.resource}`;
  }

  constructor(private readonly httpClient: HttpClient) {}

  login(credentials: Credentials) {
    return this.httpClient.post<Auth>(`${this.url}/login`, credentials, {
      headers: new HttpHeaders({ 'X-Ignore-Auth-Interceptor': 'true' }),
    });
  }

  signUp(credentials: Credentials) {
    return this.httpClient.post<Auth>(`${this.url}/signup`, credentials, {
      headers: new HttpHeaders({ 'X-Ignore-Auth-Interceptor': 'true' }),
    });
  }

  logout(auth: Auth) {
    return this.httpClient.post<Auth>(`${this.url}/logout`, {
      userId: auth.user.id,
      accessToken: auth.accessToken,
    });
  }

  forgotPassword(email: string) {
    return this.httpClient.post<void>(
      `${this.url}/forgot-password`,
      { email },
      {
        headers: new HttpHeaders({ 'X-Ignore-Auth-Interceptor': 'true' }),
      }
    );
  }

  resetPassword(userId: string, password: string) {
    return this.httpClient.post<void>(
      `${this.url}/reset-password`,
      {
        userId,
        password,
      },
      {
        headers: new HttpHeaders({ 'X-Ignore-Auth-Interceptor': 'true' }),
      }
    );
  }
}
