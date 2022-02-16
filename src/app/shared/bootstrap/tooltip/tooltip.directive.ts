import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Placement, TooltipOption, Trigger } from 'bootstrap';

@Directive({
  selector: '[bTooltip]',
})
export class TooltipDirective implements OnChanges, AfterViewInit {
  @Input('bTooltip') title: string | undefined;
  @Input() placement: Placement = 'auto';
  @Input() animation: boolean = true;
  @Input() container: string | false | HTMLElement = false;
  @Input() delay: number | { show: number; hide: number; } = 0;
  @Input() trigger: Trigger = 'hover focus';

  private tooltipInstance: JQuery<HTMLElement> | undefined;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
  }

  ngOnChanges(changes: SimpleChanges): void {
      const options: TooltipOption = {};
      Object.keys(changes).forEach(k => {
          if (!changes[k].isFirstChange()) {
              options[k] = changes[k].currentValue;
          }
      });
      if (Object.keys(options).length > 0) {
          this.makeTooltip();
      }
  }

  ngAfterViewInit(): void {
      this.makeTooltip();
  }

  private makeTooltip(): void {
      if (this.tooltipInstance) {
          this.tooltipInstance.tooltip('dispose');
      }

      this.tooltipInstance = $(this.elementRef.nativeElement).tooltip({
          title: this.title,
          placement: this.placement,
          animation: this.animation,
          container: this.container,
          delay: this.delay,
          trigger: this.trigger,
      });
  }
}
