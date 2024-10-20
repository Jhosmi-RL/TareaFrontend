import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person, PersonBody } from '../models/person';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }
  list(): Observable<Person[]> {
    return this.http.get<Person[]>(
      `${environment.backendBaseUrl}/api/personas`);
  }

  remove(Id: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.backendBaseUrl}/api/personas/${Id}`);
  }

  create(body: PersonBody): Observable<Person> {
    const url = `${environment.backendBaseUrl}/api/personas`;
    return this.http.post<Person>(url, body);
  }
}