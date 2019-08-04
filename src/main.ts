import { enableProdMode, ApplicationRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableDebugTools } from '@angular/platform-browser';

import { environment } from './environments/environment';
import { AppModule } from './app/root/app.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(ref => {
    const applicationRef = ref.injector.get(ApplicationRef);
    const appComponent = applicationRef.components[0];
    enableDebugTools(appComponent);
  })
  .catch(err => console.error(err));
