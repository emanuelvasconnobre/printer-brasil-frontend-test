export type TurnAttributesTypeOn<TypeTranform, OldType extends Object> = {
  [K in keyof OldType]: TypeTranform;
};
