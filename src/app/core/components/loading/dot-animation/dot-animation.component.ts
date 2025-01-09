import {ChangeDetectionStrategy, Component, computed, Input, signal} from '@angular/core';

@Component({
    selector: 'app-dot-animation',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dot-animation.component.html',
    standalone: true,
    styleUrls: ['./dot-animation.component.scss']
})
export class DotAnimationComponent {
  @Input() isLoading = false;
  @Input() set dotColors(colors: string[]) {
    this._colors.set(colors);
  }
  @Input() set animationSpeed(speed: number) {
    this._speed.set(speed);
  }

  private _colors = signal(['#6ACF65', '#046307', '#094D1C']);
  protected _speed = signal(0.7);

  dots = computed(() =>
    this._colors().map((color, index) => ({
      color,
      delay: (index * this._speed()) / 4
    }))
  );

  trackByFn(index: number, dot: any) {
    return index;
  }
}
