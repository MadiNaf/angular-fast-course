import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { RestApiService } from '../common/services/rest-api.service';
import { StoreService } from '../common/services/store.service';
import { Message, Topic } from '../model/chat-room.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private defaultValue: Array<Message> = [];
  private _messages$: BehaviorSubject<Message []>  = new BehaviorSubject(this.defaultValue);
  public messages$ = this._messages$.asObservable();
  
  constructor(private commonRestApiService: RestApiService,
              private http: HttpClient,
              private storeService: StoreService) { }

  public  getAllTopics(): Observable<Array<Topic>> {
    const headers = this.commonRestApiService.getHeaderRequest();
    return this.http.get(`${this.commonRestApiService.apiUrl}chat/topic/all`, { headers: headers }) as Observable<Array<Topic>>;
  }

  public createTopic(topic: Topic): Observable<any> {
    const headers = this.commonRestApiService.getHeaderRequest();
    return this.http.post(`${this.commonRestApiService.apiUrl}chat/topic/new`, topic, {headers: headers});
  }

  public createMessage(message: Message) {
    const headers = this.commonRestApiService.getHeaderRequest();
    return this.http.post(`${this.commonRestApiService.apiUrl}chat/message/new`, message, {headers: headers});
  }

  public getMessages(topicId: number): void {
    console.log('_________________________GET_MESSAGES :: ', topicId);
    const headers = this.commonRestApiService.getHeaderRequest();
    this.http.get(`${this.commonRestApiService.apiUrl}chat/message/${topicId}`, { headers: headers }).subscribe({
      next: (msg) => this._messages$.next(msg as Array<Message>),
      error: (error) => this.commonRestApiService.hadleUnauthorizedRequest(error)
    });
  }

  public async startListenMessageEvent(): Promise<void> {
    this.commonRestApiService.socket.on('messagesToClient', (message) => {
      console.log('Hello from server')
      this.getMessages(message?.topicId)
    });
  }

}
