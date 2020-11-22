import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from './../app/config';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loggedUser: string
  constructor(private http: HttpClient) { }

  userProfile(user: { username: string }): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/userProfile`, user);
  }
  postRecentTransaction(user, recenttransc): Observable<boolean> {
    let data = {
      username: user,
      Recenttransaction: [...recenttransc.recentTransactions]
    }
    return this.http.post<any>(`${config.apiUrl}/recentTransc`, data);
  }

  getRecentTransaction(req): Observable<any> {
    let user = req.username;
    //  const headers = new HttpHeaders().append('header','username');
    const params = new HttpParams().append('username', req.username);
    return this.http.get<any>(`${config.apiUrl}/recent`, { params });
    // return this.http.get<any>(`${config.apiUrl}/recent`,user);
  }
}
