import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {FbAuthResponse, User} from "../../../shared/interfaces";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string>
  constructor(private http: HttpClient) {
    this.error$ = new Subject<string>()
  }

  get token(): string | null {
   const expDate = new Date(localStorage.getItem('fb-token-exp') as string)
    if (new Date() > expDate) {//если токен не дей-т - выйти, если д-ет - получить токен
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any | HttpErrorResponse> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  public setToken(response: any | null) {//для добавления токена ко всем запросам
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)//сейчас+время жизни токена
      localStorage.setItem('fb-token', response.idToken)//записываю токен fb-token в localStorage из ответа
      localStorage.setItem('fb-token-exp', expDate.toString())//записываю как долго будет жить токен в localStorage из ответа
    } else {
      localStorage.clear()
    }
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error
    switch (message) {
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email не найден')
        break
    }
    return throwError(error) //для catchError в методе login - должны вернуть observable
  }
}

