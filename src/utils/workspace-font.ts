export const workspaceFonts = [
  "misans",
  "oppo",
  "harmony",
  "original",
] as const;
export type WorkspaceFont = (typeof workspaceFonts)[number];
export const workspaceFontStorageKey = "editorial-workspace-font-v1";
const changeEvent = "workspace-font-change";
let memoryFont: WorkspaceFont = "misans";
let memoryOnly = false;
export const workspaceFontFaces: Record<WorkspaceFont, string | null> = {
  misans: "Workspace MiSans",
  oppo: "Workspace OPPO Sans 4",
  harmony: "Workspace HarmonyOS Sans",
  original: null,
};
export function isWorkspaceFont(value: unknown): value is WorkspaceFont {
  return workspaceFonts.includes(value as WorkspaceFont);
}
export function readWorkspaceFont(): WorkspaceFont {
  if (memoryOnly) return memoryFont;
  try {
    const value = localStorage.getItem(workspaceFontStorageKey);
    if (isWorkspaceFont(value)) return value;
  } catch {}
  return memoryFont;
}
export const serverWorkspaceFont = (): WorkspaceFont => "misans";
export function restoreWorkspaceFont() {
  document.documentElement.dataset.workspaceFont = readWorkspaceFont();
}
export function setWorkspaceFont(value: WorkspaceFont): boolean {
  if (!isWorkspaceFont(value)) return false;
  memoryFont = value;
  let saved = true;
  try {
    localStorage.setItem(workspaceFontStorageKey, value);
    memoryOnly = false;
  } catch {
    memoryOnly = true;
    saved = false;
  }
  restoreWorkspaceFont();
  window.dispatchEvent(new Event(changeEvent));
  return saved;
}
export function subscribeWorkspaceFont(callback: () => void) {
  const notify = () => {
    restoreWorkspaceFont();
    callback();
  };
  const storage = (event: StorageEvent) => {
    if (event.key === workspaceFontStorageKey || event.key === null) {
      memoryOnly = false;
      notify();
    }
  };
  window.addEventListener(changeEvent, notify);
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener(changeEvent, notify);
    window.removeEventListener("storage", storage);
  };
}
export const workspaceFontBootstrap = `try{const v=localStorage.getItem('${workspaceFontStorageKey}');document.documentElement.dataset.workspaceFont=${JSON.stringify(workspaceFonts)}.includes(v)?v:'misans';}catch{document.documentElement.dataset.workspaceFont='misans';}`;
