export type pcType = boolean | number | number[] | string [] | pc.Entity | pc.Asset | pc.Vec2 | pc.Vec3 | pc.Vec4 | pc.Curve | pc.Color | pc.Texture | pc.Sprite | undefined;

export type AttributeSchema =
  | "string"
  | "number"
  | "boolean"
  | "rgb"
  | "curve"
  | "json"
  | "vec2"
  | "vec3"
  | "vec4"
  | "entity"
  | "asset"
  | "rgba";

export type TAttributeParams = {
  [key: string]: any;

  type?: AttributeSchema;
  name?: string;
  default?: pcType;
  title?: string;
  description?: string;
  placeholder?: string | string[];
  array?: boolean;
  size?: number;
  min?: number;
  max?: number;
  precision?: number;
  step?: number;
  assetType?: string;
  curves?: string[];
  color?: string;
  enum?: object[];
  schema?: TAttributeParams[];
};