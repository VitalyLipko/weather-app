import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FavoritesService } from 'src/app/core/services';

@Directive({
  selector: '[waLocationsPaginator]',
})
export class LocationsPaginatorDirective implements OnInit {
  constructor(
    private favoritesService: FavoritesService,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    if (!this.favoritesService.enablePagination()) {
      this.renderer.removeChild(
        this.elementRef.nativeElement.parentNode,
        this.elementRef.nativeElement,
      );
    }
  }
}
