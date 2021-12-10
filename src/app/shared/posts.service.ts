import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FbCreateResponse, Post} from "./interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.FbDbUrl}/posts.json`, post)
      .pipe(map((response: any) => {
        return {
          ...post,
          id: response.id as string,
          Date: new Date(post.Date)
        }
    })
    )
  }
  getAll (): Observable<Post[]> {
    return this.http.get<Post>(`${environment.FbDbUrl}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key as string,
            date: new Date(response[key].date)
          }))
      })
      )
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.FbDbUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        return {
              ...post, id,
              date: new Date(post.Date)
        }
  }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.FbDbUrl}/posts/${id}.json`)
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.FbDbUrl}/posts/${post.id}.json`, post)
  }
}
