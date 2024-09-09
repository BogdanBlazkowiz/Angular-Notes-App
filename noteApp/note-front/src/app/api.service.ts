//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }
  apiUrl: string = "https://angular-notes-app-2tbx.onrender.com/"
  getMessage() {
    return this.http.get(
      apiUrl + 'api/get-notes');
  }
  postMessage(body: {title: string | null, description: string | null}) {
    return this.http.post(this.apiUrl + 'api/new-note', body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  updateMessage(body: {title: string | null, description: string | null, id: string}) {
    let sentObject = {title: body.title, description: body.description};
    return this.http.put(this.apiUrl + 'api/update/' + body.id, sentObject, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  deleteMessage(id: string) {
    return this.http.delete(this.apiUrl + 'api/delete/' + id);
  }
}
