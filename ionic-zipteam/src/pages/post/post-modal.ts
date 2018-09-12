import { PostService } from '../../providers/post-service';
import { Component, ViewChild } from '@angular/core';
import { GiphyService } from '../../providers/giphy-service';
import { NavParams, ViewController, ToastController, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './post-modal.html'
})
export class PostModalPage {
  @ViewChild('name') name;
  post: any = {};
  error: any;
  message: any;

  constructor(public PostService: PostService,
              public giphyService: GiphyService,
              public params: NavParams,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public navCtrl: NavController) {
    if (this.params.data.id) {
      this.PostService.get(this.params.get('id')).subscribe((post: any) => {
        this.post = post;
        this.post.href = post._links.self.href;
        this.giphyService.get(post.text).subscribe(url => post.giphyUrl = url);
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save(form: NgForm) {
    let update: boolean = form['href'];
    this.PostService.save(form).subscribe(result => {
      let toast = this.toastCtrl.create({
        message: 'Post "' + form + '" ' + ((update) ? 'updated' : 'added') + '.',
        duration: 2000
      });
      toast.present();
      this.dismiss();
    }, error => this.error = error)
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.name.setFocus();
    },150);
  }
}
