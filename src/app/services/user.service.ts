import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'https://reqres.in/api'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.URL}/users?page=2?per_page=6&delay=4`)
      .pipe(
        map(resp => (resp as any)['data'])
      );
  }

  getUserById(id: string) {
    return this.http.get(`${this.URL}/users/${id}?delay=4`)
      .pipe(
        map(resp => (resp as any)['data'])
      );
  }
}

