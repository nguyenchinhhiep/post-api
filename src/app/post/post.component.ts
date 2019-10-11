import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "../shared/services/post.service";
import { Subscription } from "rxjs/";
import { Post } from "../shared/models/post.model";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public subscription: Subscription;
  isLoadingMode = false;
  notifyAddMode = false;
  notifyEditMode = false;
  notifyDeleteMode = false;
  notifyErrorMode = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.isLoadingMode = true;
    this.subscription = this.postService.getAll().subscribe(posts => {
      this.isLoadingMode = false;
      this.posts = posts;
    });
  }

  addPost(post: Post): void {
    this.isLoadingMode = true;
    this.postService.add(post).subscribe(response => {
      if (response.status == 201) {
        this.isLoadingMode = false;
        this.notifyAddMode = true;
        setTimeout(() => {
          this.notifyAddMode = false;
        }, 2000);
      } else {
        this.notifyErrorMode = true;
        setTimeout(() => {
          this.notifyErrorMode = false;
        }, 2000);
      }
    });
  }
  editPost(post: Post) {
    this.isLoadingMode = true;
    this.postService.update(post.id, post).subscribe(response => {
      if (response.status == 200) {
        this.isLoadingMode = false;
        this.notifyEditMode = true;
        setTimeout(() => {
          this.notifyEditMode = false;
        }, 2000);
      } else {
        this.notifyErrorMode = true;
        setTimeout(() => {
          this.notifyErrorMode = false;
        }, 2000);
      }
    });
  }
  deletePost(post: Post) {
    this.isLoadingMode = true;
    this.postService.delete(post.id).subscribe(response => {
      if (response.status == 200) {
        this.isLoadingMode = false;
        this.notifyDeleteMode = true;
        setTimeout(() => {
          this.notifyDeleteMode = false;
        }, 2000);
      } else {
        this.notifyErrorMode = true;
        setTimeout(() => {
          this.notifyErrorMode = false;
        }, 2000);
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
