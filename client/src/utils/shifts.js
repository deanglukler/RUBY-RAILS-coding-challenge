export const orderChrono = shifts =>
  shifts.sort(({ start: aS }, { start: bS }) => aS - bS);
