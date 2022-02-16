import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
    name: 'dateUTC',
})
export class DateUtcPipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) private readonly locale: string) {
    }

    transform(value: Date | string | number | null | undefined, format: string, addUtc: boolean = true, locale?: string): string {
        if (value == null || value === '' || value !== value) {
            return '';
        }

        let utcFormat = format;
        if (addUtc) {
            utcFormat = `${format} UTC +0`;
        }
        return formatDate(value, utcFormat, locale || this.locale, '+0000') ?? '';
    }
}
