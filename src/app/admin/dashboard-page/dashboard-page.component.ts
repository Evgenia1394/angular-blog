import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  public posts: Post[];
  public destroyed$: Subject<Post>;
  searchStr: string;

  constructor(private postService: PostsService,
              private alertService: AlertService) {
    this.posts = [];
    this.destroyed$ = new Subject();
    this.searchStr = '';
  }

  ngOnInit(): void {
    this.postService.getAll()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(posts =>
    this.posts = posts)
  }

  remove(id: string | undefined) {
    this.postService.remove(id as string)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.posts = this.posts.filter((post) => post.id !== id)
        this.alertService.warning('Пост был удален')
      })
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete()
  }


}
