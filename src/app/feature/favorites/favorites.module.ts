import { NgModule } from '@angular/core';

import { FavoritesComponent } from './favorites.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavoritesRoutingModule } from './favorites-routing.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [SharedModule, FavoritesRoutingModule],
})
export class FavoritesModule {}
