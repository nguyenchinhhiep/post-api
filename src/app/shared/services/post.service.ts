import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Post } from "../models/post.model";

@Injectable({
  providedIn: "root"
})
export class PostService {
  editItem = new Subject<Post>();
  public API_URL: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) {}
  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API_URL);
  }
  add(task: Post): Observable<HttpResponse<Post>> {
    return this.http.post<Post>(
      this.API_URL,
      {
        userId: task.userId,
        title: task.title,
        body: task.body
      },
      { observe: "response" }
    );
  }

  update(id: number, task: Post): Observable<HttpResponse<Post>> {
    return this.http.put<Post>(
      `${this.API_URL}/${id}`,
      {
        userId: task.userId,
        title: task.title,
        body: task.body
      },
      {
        observe: "response"
      }
    );
  }

  delete(id: number): Observable<HttpResponse<Post>> {
    return this.http.delete<any>(`${this.API_URL}/${id}`, {
      observe: "response"
    });
  }
}
