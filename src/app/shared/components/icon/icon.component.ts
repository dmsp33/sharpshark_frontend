import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IconType } from './icon.model';

type IconName = `${IconType.Custom}:${string}` | `${IconType.MaterialIcons}:${string}`;

@Component({
    selector: 'sh-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sh-icon',
    },
})
export class IconComponent implements OnInit {
    /**
     * Plan is use this component as the only one wrapper for icons.
     * - custom-* — is a custom icon. For example, custom-copy-link means is a custom icon with name copy-link
     */
    @Input('name') dataName: IconName;
    @Input() size: number;

    type: IconType;
    name: string;

    readonly IconType = IconType;

    get viewBox(): string | null {
        if (!this.size) {
            return null;
        }
        return `0 0 ${this.size} ${this.size}`;
    }

    ngOnInit(): void {
        this.initialize(this.dataName);
    }

    private initialize(value: IconName): void {
        const [type, name] = value.split(':') as [IconType, string];
        this.type = type;
        this.name = name;
    }
}
