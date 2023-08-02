import { getFibSeriesValue } from "./fib.mjs";
import { connectCache } from "./cache-on-golem.mjs";

console.time("computation");

const { disconnect, withCache } = connectCache();

const cachedFibSeriesValue = withCache(getFibSeriesValue);

const a = await cachedFibSeriesValue(40);
const b = await cachedFibSeriesValue(40);
const c = await cachedFibSeriesValue(40);
const d = await cachedFibSeriesValue(40);

console.timeLog("computation", "Finished computation");

console.log(a, b, c, d);

await disconnect();
