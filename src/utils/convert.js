export function numberWithCommas(x) {
  if (typeof x !== "number" || x.toString().length < 4) return x;
  if (
    x
      .toFixed(2)
      .toString()
      .includes(".00")
  )
    x = Math.floor(x);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
