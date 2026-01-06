import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Buffer } from 'buffer';
import { AppModule } from './app/app.module';


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(console.error);

  

(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined }
};
(window as any).Buffer = Buffer;
