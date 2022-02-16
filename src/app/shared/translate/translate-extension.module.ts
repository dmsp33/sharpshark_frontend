import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePartPipe } from './directives/translate-part/translate-part.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TranslatePartPipe
  ],
  exports: [
    TranslatePartPipe
  ],
})
export class TranslateExtensionModule { }
