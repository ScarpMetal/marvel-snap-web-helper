// The logger here and in the src/service-worker folder must be separate

const prefix = "[Marvel Snap Web Helper]";

export function log(...args: unknown[]) {
  console.log(`${prefix}`, ...args);
}
