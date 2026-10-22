import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Comment } from '../Model/crud.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentUrl: string = environment.api + "comment";

  constructor(private http: HttpClient) { }

  add(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentUrl, comment);
  }

  getById(_id: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.commentUrl}/${_id}`);
  }

  get(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl);
  }

  getByRecieptNumber(RecieptNumber: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.commentUrl}/${RecieptNumber}`);
  }

  delete(RecieptNumber : string): Observable<any> {
    return this.http.delete(`${this.commentUrl}/${RecieptNumber}`);
  }

  update(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(this.commentUrl, comment);
  }
}
