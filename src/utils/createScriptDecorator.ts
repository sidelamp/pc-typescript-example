import "reflect-metadata";
import { AttributeParams, AttributeSchema } from "../../../types/attributes";
import { ScriptBase } from "../../../types/scriptBase";

/**
 * Class decorator allowing the use of ES6 classes
 * to define and create PlayCanvas script types.
 * Caveat is: There is a slight iterative runtime overhead to this. (unlike Haxe which can utilize precompiled-macros)
 * The cool thing is that your script (if it uses properties) has an additional property called `attributesData` that can facilitate offboard property reflection/runtime-component
 * property GUI creation.
 * @param {pc.Application} [app]
 */
export function createScript(name: string) {
  return function (obj: any) {
    const instance = new obj();
    const script: any = pc.createScript(name);

    // Add public attributes accessible in the editor
    instance.attributesData = instance.attributesData || {};
    for (const attr in instance.attributesData) {
      script.attributes.add(attr, instance.attributesData[attr]);
    }

    // Add instance properties and methods to prototype
    const proto = script.prototype;
    for (const prop in instance) {
      if (prop !== "attributes" && !instance?.attributesData?.[prop]) {
        proto[prop] = instance?.[prop];
      }
    }

    // Add static properties
    for (const prop in obj) {
      script[prop] = obj?.[prop];
    }
  };
}

export function attrib(params?: AttributeParams): any {
  return function (
    target: ScriptBase,
    propertyKey: string,
  ): any {
    if (!Object.prototype.hasOwnProperty.call(target, "attributesData")) {
      const parentAttributes = target.attributesData || {};
      target.attributesData = { ...parentAttributes };
    }

    const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
    let type: AttributeSchema;

    switch (propertyType) {
      case String:
        type = "string";
        break;

      case Number:
        type = "number";
        break;

      case Boolean:
        type = "boolean";
        break;

      case pc.Entity:
        type = "entity";
        break;

      case pc.Asset:
        type = "asset";
        break;

      case pc.Vec2:
        type = "vec2";
        break;

      case pc.Vec3:
        type = "vec3";
        break;

      case pc.Vec4:
        type = "vec4";
        break;

      case pc.Color:
        type = "rgba";
        break;

      case pc.Curve:
        type = "curve";
        break;

      default:
        if (params?.type)
          type = params.type;
        else
          throw new TypeError("Invalid type");
    }

    if (target.attributesData)
      target.attributesData[propertyKey] = { type: type, ...params };
  };
}
