export const metricAppearances = ["contrast", "gradient", "plain"] as const;
export type MetricAppearance = (typeof metricAppearances)[number];
const storageKey = "editorial-metric-appearance-v1";
let memoryAppearance: MetricAppearance | undefined;
let memoryOnly = false;
function isAppearance(value: unknown): value is MetricAppearance {
  return metricAppearances.includes(value as MetricAppearance);
}
export function readMetricAppearance(): MetricAppearance {
  if (memoryOnly && memoryAppearance) return memoryAppearance;
  try {
    const stored = localStorage.getItem(storageKey);
    if (isAppearance(stored)) return stored;
  } catch {}
  return memoryAppearance ?? "plain";
}
export function setMetricAppearance(value: MetricAppearance) {
  memoryAppearance = value;
  document.documentElement.dataset.metricAppearance = value;
  try {
    localStorage.setItem(storageKey, value);
    memoryOnly = false;
  } catch {
    memoryOnly = true;
  }
  window.dispatchEvent(new Event("metric-appearance-change"));
}
export function subscribeMetricAppearance(callback: () => void) {
  const notify = () => {
    document.documentElement.dataset.metricAppearance = readMetricAppearance();
    callback();
  };
  const storage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) {
      memoryOnly = false;
      notify();
    }
  };
  window.addEventListener("metric-appearance-change", notify);
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener("metric-appearance-change", notify);
    window.removeEventListener("storage", storage);
  };
}
export const serverMetricAppearance = (): MetricAppearance => "plain";
export const metricAppearanceBootstrap = `try {const value=localStorage.getItem('${storageKey}');document.documentElement.dataset.metricAppearance=['contrast','gradient','plain'].includes(value)?value:'plain';} catch {document.documentElement.dataset.metricAppearance='plain';}`;
