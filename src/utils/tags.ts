export const entityTags = {
  ground: "ground",
  player: "player",
} as const;

export type TEntityTags = typeof entityTags;
