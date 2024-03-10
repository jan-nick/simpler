import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@simpler-env';
import { firstValueFrom } from 'rxjs';

export abstract class ApiService<T = unknown, FindManyArgs = unknown> {
  protected abstract readonly resource: string;
  protected abstract readonly httpClient: HttpClient;

  protected get url() {
    return `${environment.backendUrl}/${this.resource}`;
  }

  findOne(id: string) {
    return this.httpClient.get<T>(`${this.url}/${id}`);
  }

  findAll(args?: FindManyArgs) {
    let params = new HttpParams();

    if (args) {
      params = params.set('args', JSON.stringify(args));
    }

    return this.httpClient.get<T[]>(`${this.url}`, { params });
  }

  create(data: Partial<T>) {
    return firstValueFrom(this.httpClient.post<T>(`${this.url}`, data));
  }

  update(id: string, data: Partial<T>) {
    return firstValueFrom(this.httpClient.patch<T>(`${this.url}/${id}`, data));
  }

  delete(id: string) {
    return firstValueFrom(this.httpClient.delete<T>(`${this.url}/${id}`));
  }
}
