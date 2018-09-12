import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {
  public API = 'http://localhost:8080';
  public Post_API = this.API + '/Posts';
  public good: boolean;
  constructor(public http: HttpClient) {
    this.good = false;
  }

  getGoodPosts(): Observable<any> {
    return this.http.get(this.API + '/anonymousposts');
  }

  getAllPosts(): Observable<any> {
    return this.http.get(this.API + '/posts');
  }

  getPosts(): Observable<any> {
    if (this.good) {
      return this.http.get(this.API + '/anonymousposts');
    }
    return this.http.get(this.API + '/posts');
  }

  get(id: string) {
    return this.http.get(this.Post_API + '/' + id);
  }

  save(Post: any): Observable<any> {
    let result: Observable<Object>;
    if (Post['href']) {
      result = this.http.put(Post.href, Post);
    } else {
      result = this.http.post(this.Post_API, Post)
    }
    return result.catch(error => Observable.throw(error));
  }

  remove(id: string) {
    return this.http.delete(this.Post_API + '/' + id);
  }
}
