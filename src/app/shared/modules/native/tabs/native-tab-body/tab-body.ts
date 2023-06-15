import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import { Direction } from '@angular/cdk/bidi';
import { AnimationEvent } from '@angular/animations';
import { nativeTabsAnimations } from '../tabs-animations/tabs-animations';
/**
 * The portal host directive for the contents of the tab.
 * @docs-private
 */
@Directive({
  selector: '[nativeTabBodyHost]',
})
export class NativeTabBodyPortal extends CdkPortalOutlet implements OnInit, OnDestroy {
  /** Subscription to events for when the tab body begins centering. */
  private centeringSub = Subscription.EMPTY;
  /** Subscription to events for when the tab body finishes leaving from center position. */
  private leavingSub = Subscription.EMPTY;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    @Inject(forwardRef(() => NativeTabBody)) private host: NativeTabBody,
    @Inject(DOCUMENT) document: any,
  ) {
    super(componentFactoryResolver, viewContainerRef, document);
  }

  /** Set initial visibility or set up subscription for changing visibility. */
  override ngOnInit(): void {
    super.ngOnInit();
    this.centeringSub = this.host.beforeCentering
      .pipe(startWith(this.host.isCenterPosition(this.host._position)))
      .subscribe((isCentering: boolean) => {
        if (isCentering && !this.hasAttached()) {
          this.attach(this.host.content);
        }
      });

    this.leavingSub = this.host.afterLeavingCenter.subscribe(() => {
      if (!this.host.preserveContent) {
        this.detach();
      }
    });
  }

  /** Clean up centering subscription. */
  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.centeringSub.unsubscribe();
    this.leavingSub.unsubscribe();
  }
}

@Directive()
export abstract class NativeTabBodyBase implements OnInit, OnDestroy {
  /** Current position of the tab-body in the tab-group. Zero means that the tab is visible. */
  private positionIndex!: number;
  /** Subscription to the directionality change observable. */
  private dirChangeSubscription = Subscription.EMPTY;
  /** Tab body position state. Used by the animation trigger for the current state. */
  _position!: NativeTabBodyPositionState;
  /** Emits when an animation on the tab is complete. */
  readonly translateTabComplete = new Subject<AnimationEvent>();
  /** Event emitted when the tab begins to animate towards the center as the active tab. */
  @Output() readonly onCentering: EventEmitter<number> = new EventEmitter<number>();
  /** Event emitted before the centering of the tab begins. */
  @Output() readonly beforeCentering: EventEmitter<boolean> = new EventEmitter<boolean>();
  /** Event emitted before the centering of the tab begins. */
  @Output() readonly afterLeavingCenter: EventEmitter<void> = new EventEmitter<void>();
  /** Event emitted when the tab completes its animation towards the center. */
  @Output() readonly onCentered: EventEmitter<void> = new EventEmitter<void>(true);

  /** The portal host inside of this container into which the tab body content will be loaded. */
  abstract portalHost: CdkPortalOutlet;

  /** The tab body content to display. */
  @Input('content') content!: TemplatePortal;

  /** Position that will be used when the tab is immediately becoming visible after creation. */
  @Input() origin!: number | null;

  // Note that the default value will always be overwritten by `NativeTabBody`, but we need one
  // anyway to prevent the animations module from throwing an error if the body is used on its own.
  /** Duration for the tab's animation. */
  @Input() animationDuration: string = '500ms';

  /** Whether the tab's content should be kept in the DOM while it's off-screen. */
  @Input() preserveContent: boolean = false;

  /** The shifted index position of the tab body, where zero represents the active center tab. */
  @Input()
  set position(position: number) {
    this.positionIndex = position;
    this.computePositionAnimationState();
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {

    // Ensure that we get unique animation events, because the `.done` callback can get
    // invoked twice in some browsers. See https://github.com/angular/angular/issues/24084.
    this.translateTabComplete
      .pipe(
        distinctUntilChanged((x, y) => {
          return x.fromState === y.fromState && x.toState === y.toState;
        }),
      )
      .subscribe(event => {
        // If the transition to the center is complete, emit an event.
        if (this.isCenterPosition(event.toState) && this.isCenterPosition(this._position)) {
          this.onCentered.emit();
        }

        if (this.isCenterPosition(event.fromState) && !this.isCenterPosition(this._position)) {
          this.afterLeavingCenter.emit();
        }
      });
  }

  /**
   * After initialized, check if the content is centered and has an origin. If so, set the
   * special position states that transition the tab from the left or right before centering.
   */
  ngOnInit() {
    if (this._position == 'center' && this.origin != null) {
      this._position = this.computePositionFromOrigin(this.origin);
    }
  }

  ngOnDestroy() {
    this.dirChangeSubscription.unsubscribe();
    this.translateTabComplete.complete();
  }

  onTranslateTabStarted(event: AnimationEvent): void {
    const isCentering = this.isCenterPosition(event.toState);
    this.beforeCentering.emit(isCentering);
    if (isCentering) {
      this.onCentering.emit(this.elementRef.nativeElement.clientHeight);
    }
  }

  /** The text direction of the containing app. */
  getLayoutDirection(): Direction {
    return 'ltr';
  }

  /** Whether the provided position state is considered center, regardless of origin. */
  isCenterPosition(position: NativeTabBodyPositionState | string): boolean {
    return (
      position == 'center' || position == 'left-origin-center' || position == 'right-origin-center'
    );
  }

  /** Computes the position state that will be used for the tab-body animation trigger. */
  private computePositionAnimationState() {
    if (this.positionIndex < 0) {
      this._position = 'left';
    } else if (this.positionIndex > 0) {
      this._position = 'right';
    } else {
      this._position = 'center';
    }
  }

  /**
   * Computes the position state based on the specified origin position. This is used if the
   * tab is becoming visible immediately after creation.
   */
  private computePositionFromOrigin(origin: number): NativeTabBodyPositionState {
    const dir = this.getLayoutDirection();

    if ((dir == 'ltr' && origin <= 0) || (dir == 'rtl' && origin > 0)) {
      return 'left-origin-center';
    }

    return 'right-origin-center';
  }
}

/**
 * Base class with all of the `NativeTabBody` functionality.
 * @docs-private
 */

@Component({
  selector: 'native-tab-body',
  templateUrl: './tab-body.html',
  styleUrls: ['./tab-body.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [nativeTabsAnimations.translateTab],
  host: { 'class': 'tab-body' },
})
export class NativeTabBody extends NativeTabBodyBase {
  @ViewChild(CdkPortalOutlet) portalHost!: CdkPortalOutlet;

  constructor(elementRef: ElementRef<HTMLElement>) {
    super(elementRef,);
  }

}


export type NativeTabBodyPositionState =
  | 'left'
  | 'center'
  | 'right'
  | 'left-origin-center'
  | 'right-origin-center';