import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpService} from '@dbg-riskit/angular-http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class RandomApisService {

  constructor(private readonly http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
      'x-rapidapi-key': '0dd637f464msh61105d2111cbb93p10f6bajsn90eab29cfbe0'
    })
  };
  private urls = {
    currencyExchange: 'https://currency-exchange.p.rapidapi.com/exchange',
    currencyList: 'https://currency-exchange.p.rapidapi.com/listquotes',
  }
  getCurrencyList(): Observable<any[] | {}> {
    return this.http.get(this.urls.currencyList, this.httpOptions)
      .pipe(
        tap(data => console.log('DATA FROM CURRENCIES::: LIST QUOTES', data))
      );
  }
  getExchangeCurrencies(fromCurrency: string, toCurrency: string): Observable<any>  {
    return this.http.get(this.urls.currencyExchange + `?q=1.0&from=${fromCurrency}&to=${toCurrency}`, this.httpOptions)
      .pipe(
        tap(data => console.log('DATA FROM getExchangeCurrencies::: ', data))
      );
  }
}
