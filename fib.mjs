export async function getFibSeriesValue(n) {
  if (n === 0) {
    return 0;
  } else if (n < 2) {
    return 1;
  } else {
    return (await getFibSeriesValue(n - 1)) + (await getFibSeriesValue(n - 2));
  }
}
