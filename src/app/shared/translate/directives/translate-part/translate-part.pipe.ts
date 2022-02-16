import { ChangeDetectorRef, Pipe } from '@angular/core';
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

export const SPLIT_PATTERN = '<|>';

@Pipe({
  name: 'translatePart',
  pure: false,
})
export class TranslatePartPipe extends TranslatePipe {
  result: string | null = null;

  constructor(changeDetectorRef: ChangeDetectorRef, private readonly translateService: TranslateService) {
    super(translateService, changeDetectorRef);
  }

  transform(value: string, partIndex: number, ...args: any[]): string | null {
    const translated = super.transform(value, ...args);
    const result = (translated ?? '').split(SPLIT_PATTERN)[partIndex];
    if (this.result !== result) {
      this.result = result;
    }

    return this.result;
  }

}
