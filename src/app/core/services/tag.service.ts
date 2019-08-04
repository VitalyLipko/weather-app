import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private titleService: Title, private metaService: Meta) { }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }

  setPageDescription(description: string) {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  setMetaRobots(robots: string) {
    this.metaService.updateTag({ name: 'robots', content: robots });
  }
}
