import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from '../common/services/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly apiUrl = 'http://localhost:3000/';
  
  constructor(private commonRestApiService: RestApiService,
    private http: HttpClient) { }

  public  getAllTopics(): Observable<Array<any>> {
    const headers = this.commonRestApiService.getHeaderRequest();
    return this.http.get(`${this.apiUrl}chat/topic/all`, { headers: headers }) as Observable<Array<any>>;
  }

  public createTopic(topic: any): Observable<any> {
    const headers = this.commonRestApiService.getHeaderRequest();
    return this.http.post(`${this.apiUrl}chat/topic/new`, topic, {headers: headers});
  }
}
