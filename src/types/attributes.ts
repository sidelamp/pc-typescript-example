export enum AttributeSchema {
  boolean = "boolean",
  number = "number",
  string = "string",
  entity = "entity",
  asset = "asset",
  json = "json",
  rgb = "rgb",
  rgba = "rgba",
  vec2 = "vec2",
  vec3 = "vec3",
  vec4 = "vec4",
  curve = "curve",
};

type pcType = boolean | number | string | pc.Entity | pc.Vec2 | pc.Vec3 | pc.Vec4 | pc.Curve | undefined;

export type TJsonAttributeSchemaProp = {
  name: string;
  type: AttributeSchema;
  default?: pcType | pcType[];
  array?: boolean;
};

export type TAttributeParams = {
  type: AttributeSchema;
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
  enum?: string[] | number[];
  schema?: TJsonAttributeSchemaProp[];
};
