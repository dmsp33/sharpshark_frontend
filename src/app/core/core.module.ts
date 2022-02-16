import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Configuration, SharpsharkApiModule } from './api';
import { environment } from '../../environments/environment';

function apiConfiguration(): Configuration {
    return new Configuration({
        basePath: `${environment.baseUrl}/api`,
    });
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharpsharkApiModule.forRoot(apiConfiguration),
    ],
})
export class CoreModule {
}
