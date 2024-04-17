// The logger here and in the src/content-script folder must be separate

const prefix = "[Marvel Snap Web Helper]";

export function log(...args: unknown[]) {
  console.log(`${prefix}`, ...args);
}
