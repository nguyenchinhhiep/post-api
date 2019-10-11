import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { PostComponent } from "./post/post.component";
import { PostFormComponent } from "./post/post-form/post-form.component";
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostItemComponent } from "./post/post-list/post-item/post-item.component";

import { PostService } from "./shared/services/post.service";
import { NotifyComponent } from './shared/notify/notify.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostFormComponent,
    PostListComponent,
    PostItemComponent,
    NotifyComponent,
    LoadingSpinnerComponent
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule {}
