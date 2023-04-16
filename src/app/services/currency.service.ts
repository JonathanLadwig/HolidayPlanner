import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICoversionAPIResponse, ICurrencyAPIResponse } from '../models/Currencies';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  baseConvertCurrenciesURL = 'https://api.exchangerate.host/convert?';
  baseSupportedCurrenciesURL = 'https://api.exchangerate.host/symbols?';
  constructor(private httpClient: HttpClient) { }

  convertCurrencies(fromCurr: string, toCurr: string, amount: number) {
    const requestURL = `${this.baseConvertCurrenciesURL}from=${fromCurr}&to=${toCurr}&amount=${amount}`;
    return this.httpClient.get<ICoversionAPIResponse>(requestURL);
  }

  getSupportedCurrencies() {
    const requestURL = this.baseSupportedCurrenciesURL;
    return this.httpClient.get<ICurrencyAPIResponse>(requestURL);
  }

  // getSupportedCurrencies(): Observable<ICurrencyAPIResponse> {
  //   const requestURL = this.baseSupportedCurrenciesURL;
  //   return new Observable<ICurrencyAPIResponse>(observer => {
  //     axios.get(requestURL)
  //       .then(response => {
  //         console.log(response);
  //         observer.next(response.data);
  //         observer.complete();
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         observer.error(error);
  //       })
  //   })
  // }
}
