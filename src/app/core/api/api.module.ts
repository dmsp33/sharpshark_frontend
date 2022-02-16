import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AlertaService } from './api/alerta.service';
import { CertificadoService } from './api/certificado.service';
import { DisputaService } from './api/disputa.service';
import { DocumentoService } from './api/documento.service';
import { DocumentosEliminadosService } from './api/documentosEliminados.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class SharpsharkApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<SharpsharkApiModule> {
        return {
            ngModule: SharpsharkApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: SharpsharkApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('SharpsharkApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
