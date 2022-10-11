import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestApiService } from '../common/services/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private defaultValue: Array<any> = [];
  private _messages$: BehaviorSubject<string []>  = new BehaviorSubject(this.defaultValue);
  public messages$ = this._messages$.asObservable();
  
  constructor(private commonRestApiService: RestApiService,
    private http: HttpClient) { }

  public  getAllTopics(): Observable<Array<any>> {
    const headers = this.commonRestApiService.getHeaderRequest();
    return this.http.get(`${this.commonRestApiService.apiUrl}chat/topic/all`, { headers: headers }) as Observable<Array<any>>;
  }

  public createTopic(topic: any): Observable<any> {
    const headers = this.commonRestApiService.getHeaderRequest();
    return this.http.post(`${this.commonRestApiService.apiUrl}chat/topic/new`, topic, {headers: headers});
  }

  public setMessages(): void {
    this.commonRestApiService.socket.on('msgToClient', (message) => {
      this._messages$.next(message);
    });
  }

}
