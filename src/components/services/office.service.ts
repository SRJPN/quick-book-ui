import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class OfficeService {

  private baseUrl: string = "https://tw-quick-book.herokuapp.com";
  private offices: string = this.baseUrl + '/offices';

  constructor(private http: Http) {
  }

  all() {
    return this.http.get(this.offices).map(response => response.json());
  }

}
