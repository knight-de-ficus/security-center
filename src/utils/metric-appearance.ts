export const metricAppearances = ["contrast", "gradient", "plain"] as const;
export type MetricAppearance = (typeof metricAppearances)[number];
const storageKey = "editorial-metric-appearance-v1";
let memoryAppearance: MetricAppearance | undefined;
function isAppearance(value: unknown): value is MetricAppearance {
  return metricAppearances.includes(value as MetricAppearance);
}
export function readMetricAppearance(): MetricAppearance {
  try {
    const stored = localStorage.getItem(storageKey);
    if (isAppearance(stored)) return stored;
  } catch {}
  return memoryAppearance ?? "gradient";
}
export function setMetricAppearance(value: MetricAppearance) {
  memoryAppearance = value;
  document.documentElement.dataset.metricAppearance = value;
  try {
    localStorage.setItem(storageKey, value);
  } catch {}
  window.dispatchEvent(new Event("metric-appearance-change"));
}
export function subscribeMetricAppearance(callback: () => void) {
  const notify = () => {
    document.documentElement.dataset.metricAppearance = readMetricAppearance();
    callback();
  };
  window.addEventListener("metric-appearance-change", notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener("metric-appearance-change", notify);
    window.removeEventListener("storage", notify);
  };
}
export const serverMetricAppearance = (): MetricAppearance => "gradient";
export const metricAppearanceBootstrap = `try {const value=localStorage.getItem('${storageKey}');document.documentElement.dataset.metricAppearance=['contrast','gradient','plain'].includes(value)?value:'gradient';} catch {document.documentElement.dataset.metricAppearance='gradient';}`;
