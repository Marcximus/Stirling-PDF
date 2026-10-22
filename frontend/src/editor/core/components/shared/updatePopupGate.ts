import type { AppConfig } from "@app/types/appConfig";

export function isUpdatePopupAllowed(
  config: AppConfig | null,
  isMobile: boolean,
): boolean {
  if (!config) return false;
  if (isMobile) return false;
  return config.shouldShowUpdate === true;
}

/**
 * Whether Settings shows the Software updates card, whose mount runs an update
 * check. The desktop updater always gets it; the web app needs a version to
 * report and the server's update setting on, so `system.showUpdate: false`
 * leaves the web app making no update request at all.
 */
export function isUpdateCardAllowed(
  config: AppConfig | null,
  hasDesktopUpdater: boolean,
): boolean {
  if (hasDesktopUpdater) return true;
  return Boolean(config?.appVersion) && config?.shouldShowUpdate === true;
}
