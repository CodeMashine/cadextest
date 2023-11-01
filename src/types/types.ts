interface MagicValues<T> {
  [string: string]: T;
}

type vector = number[];
type triangle = vector[];
type coords = triangle[];

export { MagicValues, coords, triangle, vector };
