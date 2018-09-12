import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { PostService } from '../../providers/post-service';
import { GiphyService } from '../../providers/giphy-service';
import { PostModalPage } from './post-modal';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  private posts: Array<any>;
  public anonposts: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public PostService: PostService, public giphyService: GiphyService,
              public modalCtrl: ModalController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.PostService.getAllPosts().subscribe(Posts => {
      this.posts = Posts;
      // console.log("posts ", Posts.length)
      for (const post of this.posts) {
        this.giphyService.get(post.text).subscribe(url => {
          post.giphyUrl = url
        });
      }
    })
  }
  changeList(event) {
    this.PostService.good = this.anonposts.valueOf();
    this.ionViewDidLoad();
  }
  openModal(PostId) {
    let modal = this.modalCtrl.create(PostModalPage, PostId);
    modal.present();
    // refresh data after modal dismissed
    modal.onDidDismiss(() => this.ionViewDidLoad())
  }

  remove(Post) {
    this.PostService.remove(Post.id).subscribe(response => {
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i] === Post) {
          this.posts.splice(i, 1);
          let toast = this.toastCtrl.create({
            message: 'Post "' + Post.id + '" deleted.',
            duration: 2000,
            position: 'top'
          });
          toast.present();
        }
      }
    });
  }
}
