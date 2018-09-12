import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPage } from './post';
import { PostService } from '../../providers/post-service';
import { GiphyService } from '../../providers/giphy-service';
import { PostModalPage } from './post-modal';

@NgModule({
  declarations: [
    PostPage,
    PostModalPage
  ],
  imports: [
    IonicPageModule.forChild(PostPage),
  ],
  providers: [
    PostService,
    GiphyService
  ],
  entryComponents: [
    PostModalPage
  ]
})
export class PostPageModule {}
