import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Post } from "src/app/shared/models/post.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[];
  @Input() isLoadingMode: boolean;
  @Output() deletePost = new EventEmitter<Post>();

  constructor() {}

  ngOnInit() {}
}
