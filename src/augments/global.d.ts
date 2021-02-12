type Point = [number, number];

type FirstArgument<T> = T extends (a: infer U) => any ? U : never;
