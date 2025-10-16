import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const API_HOST = environment.apiHost;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  token: string;

  constructor(private http: HttpClient) {
    console.log('[ApiService] Constructed with API_HOST:', API_HOST);
  }

  static handleError(error: Error) {
    alert(error.message);
  }

  static extractData(res: HttpEvent<any>) {
    const body = res;
    return body || {};
  }

  setAuthToken(token: string) {
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `jwt ${token}`);
    this.token = token;
  }

  get(endpoint: string): Promise<any> {
    const url = `${API_HOST}${endpoint}`;
    console.log('[ApiService] GET →', url); // 🧭 adăugat pentru debugging
    const req = this.http.get(url, this.httpOptions).pipe(map(ApiService.extractData));

    return req
      .toPromise()
      .catch((e) => {
        ApiService.handleError(e);
        throw e;
      });
  }

  post(endpoint: string, data: any): Promise<any> {
    const url = `${API_HOST}${endpoint}`;
    console.log('[ApiService] POST →', url); // 🧭 adăugat pentru debugging
    return this.http.post<HttpEvent<any>>(url, data, this.httpOptions)
      .toPromise()
      .catch((e) => {
        ApiService.handleError(e);
        throw e;
      });
  }

  async upload(endpoint: string, file: File, payload: any): Promise<any> {
    console.log('[ApiService] Upload init →', `${API_HOST}${endpoint}`);
    const signed_url = (await this.get(`${endpoint}/signed-url/${file.name}`)).url;

    const headers = new HttpHeaders({ 'Content-Type': file.type });
    const req = new HttpRequest('PUT', signed_url, file, {
      headers: headers,
      reportProgress: true,
    });

    return new Promise(resolve => {
      this.http.request(req).subscribe((resp) => {
        if (resp && (<any>resp).status && (<any>resp).status === 200) {
          resolve(this.post(endpoint, payload));
        }
      });
    });
  }
}
