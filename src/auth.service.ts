import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private authToken :any;

  constructor(private http: HttpClient) {}

  login(credentials:any) {
    return this.http.post(`${this.baseUrl}/login`, credentials)
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  getProfile() { 
    let headers={
      'Authorization':'Bearer '+this.getToken()
    }
    return this.http.get(`${this.baseUrl}/profile`,{headers:headers});
  }

  logout(): void {
    localStorage.removeItem(this.authToken);
  }

  getToken() :any{
    var Token = localStorage.getItem('authToken');
    if (Token) {
      const Tokens = JSON.parse(Token);
    console.log(Tokens);
  return Tokens;
  }
}
}
