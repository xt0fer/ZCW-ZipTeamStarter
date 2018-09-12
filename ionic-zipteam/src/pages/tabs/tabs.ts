import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { UserPage } from '../user/user';
import { HomePage } from '../home/home';
import { PostPage } from '../post/post';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = PostPage;
  tab3Root = UserPage;
  tab4Root = AboutPage;

  constructor() {

  }
}
