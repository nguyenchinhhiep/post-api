import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Post } from "src/app/shared/models/post.model";
import { PostService } from "src/app/shared/services/post.service";

@Component({
  selector: "app-post-item",
  templateUrl: "./post-item.component.html",
  styleUrls: ["./post-item.component.css"]
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Output() deletePost = new EventEmitter<any>();
  constructor(private postService: PostService) {}

  onDelete() {
    this.deletePost.emit();
  }

  onEdit() {
    this.postService.editItem.next(this.post);
  }
  ngOnInit() {}
}
