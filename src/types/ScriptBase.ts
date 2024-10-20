/* eslint-disable @typescript-eslint/no-explicit-any */
import { TAttributeParams } from "./attributes";

// Base class to inherit from for script types
export class ScriptBase {
  // custom holder to contain attributesData used for initialization of attributes
  attributesData?: { [key: string]: TAttributeParams };

  // -- Utils
  getScript<T>(entity: pc.Entity, scriptName: string): T | undefined {
    const script = entity.script?.get(scriptName);
    if (!script) {
      console.error(`[${this.entity.name}] Script ${scriptName} not found`);
      return;
    }
    return script as unknown as T;
  }

  // -- PLAYCANVAS stuff from here onwards

  // lifecycle methods
  /**
  * @function
  * @name pc.ScriptType#[initialize]
  * @description Called when script is about to run for the first time.
  */
  public onInitialize?(): void;

  /**
  * @function
  * @description Called when script is about to enable.
  */
  public onEnable?(): void;

  /**
  * @function
  * @description Called when script is about to disable.
  */
  public onDisable?(): void;

  /**
  * @function
  * @description Called when script is about to disable.
  */
  public onDestroy?(): void;

  /**
 * @function
 * @name pc.ScriptType#[postInitialize]
 * @description Called after all initialize methods are executed in the same tick or enabling chain of actions.
 */
  public onPostInitialize?(): void;

  /**
   * @function
   * @name pc.ScriptType#[update]
   * @description Called for enabled (running state) scripts on each tick.
   * @param {number} dt - The delta time in seconds since the last frame.
   */
  public update?(dt: number): void;

  /**
   * @function
   * @name pc.ScriptType#[postUpdate]
   * @description Called for enabled (running state) scripts on each tick, after update.
   * @param {number} dt - The delta time in seconds since the last frame.
   */
  public postUpdate?(dt: number): void;
  /**
   * @function
   * @name pc.ScriptType#[swap]
   * @description Called when a ScriptType that already exists in the registry
   * gets redefined. If the new ScriptType has a `swap` method in its prototype,
   * then it will be executed to perform hot-reload at runtime.
   * @example
   * swap(old: ScriptTypeBase): void {
   *    const concreteClass = <ConcreteClass>old;
   *    this.property = concreteClass.property;
   * };
  */
  public swap?(old: ScriptBase): void;

  //#region private methods
  /**
   * @function
   * @name pc.ScriptType#[initialize]
   * @description Called when script is about to run for the first time.
   */
  private initialize(): void {
    const onDestroy = () => {
      if (this.hasEvent?.("enable"))
        this.off?.("enable", this.onEnable, this);

      if (this.hasEvent?.("disable"))
        this.off?.("disable", this.onDisable, this);

      this.off?.("destroy", onDestroy, this);
      this.onDestroy?.();
    };

    if (this.onDestroy)
      this.on?.("destroy", onDestroy, this);

    if (this.onEnable)
      this.on?.("enable", this.onEnable, this);

    if (this.onDisable)
      this.on?.("disable", this.onDisable, this);

    this.onInitialize?.();
  }

  /**
   * @function
   * @name pc.ScriptType#[postInitialize]
   * @description Called after all initialize methods are executed in the same tick or enabling chain of actions.
   */
  private postInitialize?(): void {
    // if (!this.hasEvent?.("destroy") && this.onDestroy)
    //   this.on?.("destroy", this.onDestroy, this);

    this.onPostInitialize?.();
  }
  //#endregion private methods

  // attributes
  readonly attributes: pc.ScriptAttributes;

  /**
   * @function
   * @name pc.EventHandler#on
   * @description Attach an event handler to an event.
   * @param {string} name - Name of the event to bind the callback to.
   * @param {pc.callbacks.HandleEvent} callback - Function that is called when event is fired. Note the callback is limited to 8 arguments.
   * @param {object} [scope] - Object to use as 'this' when the event is fired, defaults to current this.
   * @returns {pc.EventHandler} Self for chaining.
   * @example
   * this.on?.('test', function (a, b) {
   *     console.log(a + b);
   * });
   * obj.fire?.('test', 1, 2); // prints 3 to the console
   */
  on?(name: string, callback: pc.HandleEventCallback, scope?: any): pc.EventHandle;

  /**
   * @function
   * @name pc.EventHandler#off
   * @description Detach an event handler from an event. If callback is not provided then all callbacks are unbound from the event,
   * if scope is not provided then all events with the callback will be unbound.
   * @param {string} [name] - Name of the event to unbind.
   * @param {pc.callbacks.HandleEvent} [callback] - Function to be unbound.
   * @param {object} [scope] - Scope that was used as the this when the event is fired.
   * @returns {pc.EventHandler} Self for chaining.
   * @example
   * var handler = function () {
   * };
   * obj.on?.('test', handler);
   *
   * obj.off?.(); // Removes all events
   * obj.off?.('test'); // Removes all events called 'test'
   * obj.off?.('test', handler); // Removes all handler functions, called 'test'
   * obj.off?.('test', handler, this); // Removes all hander functions, called 'test' with scope this
   */
  off?(name?: string, callback?: pc.HandleEventCallback, scope?: any): pc.EventHandle;

  /**
   * @function
   * @name pc.EventHandler#fire
   * @description Fire an event, all additional arguments are passed on to the event listener.
   * @param {object} name - Name of event to fire.
   * @param {*} [arg1] - First argument that is passed to the event handler.
   * @param {*} [arg2] - Second argument that is passed to the event handler.
   * @param {*} [arg3] - Third argument that is passed to the event handler.
   * @param {*} [arg4] - Fourth argument that is passed to the event handler.
   * @param {*} [arg5] - Fifth argument that is passed to the event handler.
   * @param {*} [arg6] - Sixth argument that is passed to the event handler.
   * @param {*} [arg7] - Seventh argument that is passed to the event handler.
   * @param {*} [arg8] - Eighth argument that is passed to the event handler.
   * @returns {pc.EventHandler} Self for chaining.
   * @example
   * obj.fire?.('test', 'This is the message');
   */
  fire?(
    name: any,
    arg1?: any,
    arg2?: any,
    arg3?: any,
    arg4?: any,
    arg5?: any,
    arg6?: any,
    arg7?: any,
    arg8?: any
  ): pc.EventHandler;

  /**
   * @function
   * @name pc.EventHandler#once
   * @description Attach an event handler to an event. This handler will be removed after being fired once.
   * @param {string} name - Name of the event to bind the callback to.
   * @param {pc.callbacks.HandleEvent} callback - Function that is called when event is fired. Note the callback is limited to 8 arguments.
   * @param {object} [scope] - Object to use as 'this' when the event is fired, defaults to current this.
   * @returns {pc.EventHandler} Self for chaining.
   * @example
   * obj.once?.('test', function (a, b) {
   *     console.log(a + b);
   * });
   * obj.fire?.('test', 1, 2); // prints 3 to the console
   * obj.fire?.('test', 1, 2); // not going to get handled
   */
  once?(name: string, callback: pc.HandleEventCallback, scope?: any): pc.EventHandle;

  /**
   * @function
   * @name pc.EventHandler#hasEvent
   * @description Test if there are any handlers bound to an event name.
   * @param {string} name - The name of the event to test.
   * @returns {boolean} True if the object has handlers bound to the specified event name.
   * @example
   * obj.on?.('test', function () { }); // bind an event to 'test'
   * obj.hasEvent?.('test'); // returns true
   * obj.hasEvent?.('hello'); // returns false
   */
  hasEvent?(name: string): boolean;

  /**
   * The {@link pc.Application} that the instance of this type
   * belongs to.
   */
  app: pc.Application;

  /**
   * The {@link pc.Entity} that the instance of this type belongs to.
   */
  entity: pc.Entity;

  /**
   * True if the instance of this type is in running state. False
   * when script is not running, because the Entity or any of its parents are disabled or the
   * Script Component is disabled or the Script Instance is disabled. When disabled no update
   * methods will be called on each tick. initialize and postInitialize methods will run once
   * when the script instance is in `enabled` state during app tick.
   */
  enabled: boolean;
}
