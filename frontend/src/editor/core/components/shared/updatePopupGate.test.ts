// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  isUpdateCardAllowed,
  isUpdatePopupAllowed,
} from "@app/components/shared/updatePopupGate";

describe("isUpdatePopupAllowed", () => {
  it("returns false until config has loaded", () => {
    expect(isUpdatePopupAllowed(null, false)).toBe(false);
  });

  it("shows on desktop when the backend allows it", () => {
    expect(isUpdatePopupAllowed({ shouldShowUpdate: true }, false)).toBe(true);
  });

  it("never shows on a mobile / narrow viewport", () => {
    expect(isUpdatePopupAllowed({ shouldShowUpdate: true }, true)).toBe(false);
  });

  it("hides when the backend says not to (non-admin / showUpdate disabled)", () => {
    expect(isUpdatePopupAllowed({ shouldShowUpdate: false }, false)).toBe(
      false,
    );
  });

  it("fails closed when the backend omits the decision (e.g. 401 fallback)", () => {
    expect(isUpdatePopupAllowed({ enableLogin: true }, false)).toBe(false);
  });
});

describe("isUpdateCardAllowed", () => {
  it("always shows for the desktop updater", () => {
    expect(isUpdateCardAllowed({ shouldShowUpdate: false }, true)).toBe(true);
  });

  it("shows on the web when there is a version and updates are on", () => {
    expect(
      isUpdateCardAllowed(
        { appVersion: "3.0.1", shouldShowUpdate: true },
        false,
      ),
    ).toBe(true);
  });

  it("hides on the web when the server has updates off", () => {
    expect(
      isUpdateCardAllowed(
        { appVersion: "3.0.1", shouldShowUpdate: false },
        false,
      ),
    ).toBe(false);
  });

  it("hides on the web with no version to report", () => {
    expect(isUpdateCardAllowed({ shouldShowUpdate: true }, false)).toBe(false);
    expect(isUpdateCardAllowed(null, false)).toBe(false);
  });
});
