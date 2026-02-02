/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, any>
    ) => void;
  }
}
