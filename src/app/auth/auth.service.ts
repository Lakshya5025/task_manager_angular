import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TokenType } from '../schema';
import { tokenAPI } from 'env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userdata;
  constructor(private http: HttpClient) {
    this.userdata = localStorage.getItem('data');
  }
  token = '';

  private api: string = tokenAPI;

  /**
   * Initiates the HTTP request to fetch the token.
   * @returns An observable containing the token object.
   */
  fetchFromApi(): Observable<TokenType> {
    return this.http.get<TokenType>(this.api);
  }

  /**
   * Fetches the token from the API and saves it to the localstorage.
   * @returns The observable for component to subscribe.
   */
  setToken() {
    return this.fetchFromApi().pipe(
      tap((data) => {
        this.token = data.token;
        localStorage.setItem('token', this.token);
      })
    );
  }

  /**
   * Retrives the token
   * @returns The token string or an empty string if not found.
   */
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  /**
   * Clears the localstorage.
   */
  logout() {
    localStorage.clear();
  }
}
