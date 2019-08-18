import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';

import { LocationManagementService } from 'src/app/core/services/location-management.service';

@Directive({
  selector: '[locationsPaginator]'
})
export class LocationsPaginatorDirective implements OnInit {

  constructor(
    private locationManagment: LocationManagementService,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    if (!this.locationManagment.enablePagination()) {
      this.renderer.removeChild(this.elementRef.nativeElement.parentNode, this.elementRef.nativeElement);
    }
  }
}
