import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import localeIt from '@angular/common/locales/it';

import { registerLocaleData } from '@angular/common';
registerLocaleData(localeIt);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
