export const change = prop => cursor => x => {
  cursor.set(prop, x);
  return x;
};