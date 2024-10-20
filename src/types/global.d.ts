// eslint-disable-next-line @typescript-eslint/no-unused-vars
import pc from "playcanvas";

declare global {
  namespace pc {
    type HandleEventCallback = (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, arg6?: any, arg7?: any, arg8?: any) => any;

    class TweenManager {
      constructor(app: pc.AppBase);
      add(tween: pc.Tween): pc.Tween;
      update(dt: number): void;
    }

    class Tween {
      constructor(target: any, manager: pc.TweenManager, entity?: pc.Entity);
      to(properties: any, duration: number, easing: any, delay?: number, repeat?: number, yoyo?: boolean): this;
      from(properties: any, duration: number, easing: any, delay?: number, repeat?: number, yoyo?: boolean): this;
      rotate(properties: any, duration: number, easing: any, delay?: number, repeat?: number, yoyo?: boolean): this;

      delay(delay: number): this;
      yoyo(yoyo: boolean): this;
      loop(yoyo: boolean): this;
      repeat(num: number, delay?: number): this;

      onUpdate(callback: (dt: number) => void): this;
      onComplete(callback: (extra: number) => void): this;
      onLoop(callback: () => void): this;

      update(dt: number): boolean;

      chain(...tweens: pc.Tween[]): this;
      reverse(): this;
      start(): this;
      pause(): void;
      resume(): void;
      stop(): void;
    }

    class AppBase {
      addTweenManager(): void;
      tween(target: any): pc.Tween;
    }

    interface Entity {
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
    function ElasticInOut(t: number): number
  }
}