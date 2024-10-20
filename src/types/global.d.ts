// eslint-disable-next-line @typescript-eslint/no-unused-vars
import pc from "playcanvas";

declare global {
  namespace pc {
    type HandleEventCallback = (
      arg1?: any,
      arg2?: any,
      arg3?: any,
      arg4?: any,
      arg5?: any,
      arg6?: any,
      arg7?: any,
      arg8?: any
    ) => any;

    class TweenManager {
      constructor(app: pc.AppBase);
      add(tween: pc.Tween): pc.Tween;
      update(dt: number): void;
    }

    class Tween {
      constructor(target: any, manager: pc.TweenManager, entity?: pc.Entity);
      /**
       * Sets the target properties to animate, duration, easing function, delay, repeat, and yoyo settings for the tween.
       * @param {object} properties - The target properties that the tween will animate to.
       * @param {number} duration - The duration of the tween in seconds.
       * @param {function} easing - The easing function to use for the tween.
       * @param {number} [delay] - The delay in seconds before the tween starts.
       * @param {number} [repeat] - The number of times the tween should repeat.
       * @param {boolean} [yoyo] - Whether the tween should play in reverse after reaching the end.
       * @returns {this} - Returns the tween instance for chaining.
       * @example
       * this.entity
       *      .tween(this.entity.getLocalScale())
       *      .to({ x: 1.0, y: 1.0, z: 1.0 }, .25, pc.BackInOut)
       *      .start();
       */
      to(
        properties: any,
        duration: number,
        easing: any,
        delay?: number,
        repeat?: number,
        yoyo?: boolean
      ): this;

      from(
        properties: any,
        duration: number,
        easing: any,
        delay?: number,
        repeat?: number,
        yoyo?: boolean
      ): this;

      /**
       * Rotates the target properties over a specified duration with an optional easing function, delay, repeat, and yoyo settings.
       * @param {object} properties - The target properties that the tween will animate to.
       * @param {number} duration - The duration of the tween in seconds.
       * @param {function} easing - The easing function to use for the tween.
       * @param {number} [delay] - The delay in seconds before the tween starts.
       * @param {number} [repeat] - The number of times the tween should repeat.
       * @param {boolean} [yoyo] - Whether the tween should play in reverse after reaching the end.
       * @returns {this} - Returns the tween instance for chaining.
       * @example
       * this.entity.tween(this.entity.getLocalEulerAngles())
       *        .rotate(new pc.Vec3(.5, .5, .5), this.duration, pc.SineInOut)
       *        .loop(true)
       *        .yoyo(true)
       *        .start();
       */
      rotate(
        properties: any,
        duration: number,
        easing: any,
        delay?: number,
        repeat?: number,
        yoyo?: boolean
      ): this;

      /**
       * Sets the delay before the tween starts.
       * @param {number} delay - The delay in seconds.
       * @returns {this} - Returns the tween instance for chaining.
       */
      delay(delay: number): this;

      /**
       * Enables or disables the yoyo effect, making the tween play in reverse after reaching the end.
       * @param {boolean} yoyo - Whether to enable the yoyo effect.
       * @returns {this} - Returns the tween instance for chaining.
       */
      yoyo(yoyo: boolean): this;

      /**
       * Sets the tween to loop with optional yoyo effect.
       * @param {boolean} yoyo - Whether to enable the yoyo effect for the loop.
       * @returns {this} - Returns the tween instance for chaining.
       */
      loop(yoyo: boolean): this;

      /**
       * Sets the number of times the tween should repeat with optional delay between repeats.
       * @param {number} num - The number of times to repeat the tween.
       * @param {number} [delay] - The delay in seconds before each repeat.
       * @returns {this} - Returns the tween instance for chaining.
       */
      repeat(num: number, delay?: number): this;

      /**
       * Sets a callback function to be called on each update of the tween.
       * @param {function} callback - The function to be called on each update.
       * @returns {this} - Returns the tween instance for chaining.
       */
      onUpdate(callback: (dt: number) => void): this;

      /**
       * Sets a callback function to be called when the tween completes.
       * @param {function} callback - The function to be called when the tween completes.
       * @returns {this} - Returns the tween instance for chaining.
       */
      onComplete(callback: (extra: number) => void): this;

      /**
       * Sets a callback function to be called on each loop of the tween.
       * @param {function} callback - The function to be called on each loop.
       * @returns {this} - Returns the tween instance for chaining.
       */
      onLoop(callback: () => void): this;

      /**
       * Updates the tween based on the elapsed time.
       * @param {number} dt - The delta time in seconds since the last update.
       * @returns {boolean} - Returns true if the tween is still active, false if it has completed.
       */
      update(dt: number): boolean;

      /**
       * Chains multiple tweens to play sequentially.
       * @param {...pc.Tween} tweens - The tweens to chain.
       * @returns {this} - Returns the tween instance for chaining.
       */
      chain(...tweens: pc.Tween[]): this;

      /**
       * Reverses the direction of the tween.
       * @returns {this} - Returns the tween instance for chaining.
       */
      reverse(): this;

      /**
       * Starts the tween.
       * @returns {this} - Returns the tween instance for chaining.
       */
      start(): this;

      /**
       * Pauses the tween.
       */
      pause(): void;

      /**
       * Resumes the tween after it has been paused.
       */
      resume(): void;

      /**
       * Stops the tween.
       */
      stop(): void;
    }

    class AppBase {
      addTweenManager(): void;
      tween(target: any): pc.Tween;
    }

    interface Entity {
      /**
       * @name  pc.Entity
       * @param {object} target - The target property that will be tweened
       * @param {string} options - The property that will be tweened
       * @example
       * this.entity
       *      .tween(this.entity.getLocalScale(), { element: "height" })
       *      .to({ height: 10.0 }, .25, pc.BackInOut)
       *      .start();
       * 
       * let element = {
       *      width: 100,
       *      height: 100
       * };
       * 
       * this.entity
       *      .tween(this.entity.element)
       *      .to(element, .25, pc.BackIn)
       *      .start();
       */
      tween(target: any, options?: { element?: string }): Tween;
    }

    function Linear(t: number): number;
    function QuadraticIn(t: number): number;
    function QuadraticOut(t: number): number;
    function QuadraticInOut(t: number): number;
    function CubicIn(t: number): number;
    function CubicOut(t: number): number;
    function CubicInOut(t: number): number;
    function QuarticIn(t: number): number;
    function QuarticOut(t: number): number;
    function QuarticInOut(t: number): number;
    function QuinticIn(t: number): number;
    function QuinticOut(t: number): number;
    function QuinticInOut(t: number): number;
    function SineIn(t: number): number;
    function SineOut(t: number): number;
    function SineInOut(t: number): number;
    function ExponentialIn(t: number): number;
    function ExponentialOut(t: number): number;
    function ExponentialInOut(t: number): number;
    function CircularIn(t: number): number;
    function CircularOut(t: number): number;
    function CircularInOut(t: number): number;
    function BackIn(t: number): number;
    function BackOut(t: number): number;
    function BackInOut(t: number): number;
    function BounceIn(t: number): number;
    function BounceOut(t: number): number;
    function BounceInOut(t: number): number;
    function ElasticIn(t: number): number;
    function ElasticOut(t: number): number;
    function ElasticInOut(t: number): number;
  }
}