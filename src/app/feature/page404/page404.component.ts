import { Component, OnInit } from '@angular/core';

import { TagService } from 'src/app/core/services/tag.service';

@Component({
  selector: 'wa-page404',
  templateUrl: './page404.component.html',
  styles: [
    `
    .fa-times-circle {
      font-size: 2.5em;
    }
    `
  ]
})
export class Page404Component implements OnInit {

  constructor(private seo: TagService) { }

  ngOnInit() {
    this.seo.setPageTitle('Weather App | Страница не найдена');
    this.seo.setPageDescription('');
    this.seo.setMetaRobots('noindex, nofollow');
  }

}
