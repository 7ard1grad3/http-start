import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ServerService {
  constructor(private http: Http) {}
  storeServers(servers: any[]) {
    const header = new Headers({
      'Content-Type': 'application/json'
    });
    /* return this.http.post('https://angular4-test-8b0f8.firebaseio.com/data.json', servers,
    {
      headers: header
    }); */
    return this.http.put('https://angular4-test-8b0f8.firebaseio.com/data.json', servers,
    {
      headers: header
    });
  }
  getServers() {
    return this.http.get('https://angular4-test-8b0f8.firebaseio.com/data.json')
    .map(
      (response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'FETCHED_' + server.name;
        }
        return data;
      }
    ).catch(
      (response: Response) => {
        return Observable.throw(response);
      }
    );
  }
  getAppName() {
    return this.http.get('https://angular4-test-8b0f8.firebaseio.com/appName.json').map(
      (response: Response) => {
        return response.json();
      }
    );
  }
}
