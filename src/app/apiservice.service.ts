import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class APIService {
	
baseUrl:string = "https://localhost:44319/api/trainingdetails";
 constructor(private httpClient : HttpClient) { }

 public saveTrainingInfo(obj){
     return this.httpClient.post(this.baseUrl,obj, {
       headers: new HttpHeaders({
            'Content-Type':  'application/json',
          })
     }).pipe(map(data=>
      data));  
 }
 
}

