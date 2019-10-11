import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from "src/app/shared/services/post.service";
import { Post } from "src/app/shared/models/post.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.css"]
})
export class PostFormComponent implements OnInit, OnDestroy {
  @Output() addPost = new EventEmitter<Post>();
  @Output() editPostEmit = new EventEmitter<Post>();
  editPost: Post;
  postForm: FormGroup;
  postEditForm: FormGroup;
  editMode = false;
  post: Post;
  subscription: Subscription;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.subscription = this.postService.editItem.subscribe((item: Post) => {
      this.editPost = item;
      this.editMode = true;
      this.initEditForm();
    });
    this.initForm();
  }

  onSubmit() {
    const newTask = new Post(
      this.postForm.value["userId"],
      this.postForm.value["title"],
      this.postForm.value["body"]
    );
    this.addPost.emit(newTask);
    this.postForm.reset();
  }
  onSubmitEdit() {
    const newEditPost = {
      id: this.editPost.id,
      userId: this.postEditForm.value["userId"],
      title: this.postEditForm.value["title"],
      body: this.postEditForm.value["body"]
    };
    this.editPostEmit.emit(newEditPost);
    this.postEditForm.reset();
    this.editMode = false;
  }
  onCancel() {
    this.editMode = false;
    this.postEditForm.reset();
  }

  private initForm() {
    let todoId = null;
    let todoTitle = "";
    let todoBody = "";
    this.postForm = new FormGroup({
      userId: new FormControl(todoId, Validators.required),
      title: new FormControl(todoTitle, Validators.required),
      body: new FormControl(todoBody, Validators.required)
    });
  }
  private initEditForm() {
    let todoId = this.editPost.userId;
    let todoTitle = this.editPost.title;
    let todoBody = this.editPost.body;
    this.postEditForm = new FormGroup({
      userId: new FormControl(todoId, Validators.required),
      title: new FormControl(todoTitle, Validators.required),
      body: new FormControl(todoBody, Validators.required)
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
