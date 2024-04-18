import { getCards } from "./cards";
import { log } from "./logger";

// Listen for event when page is ready
async function loadWindow() {
  return new Promise<void>((resolve) => {
    function done() {
      log("Window loaded");
      window.removeEventListener("load", done);
      resolve();
    }
    window.addEventListener("load", done);
  });
}

// Load up the cards
async function loadCards() {
  log("Loading up cards");
  const cards = await getCards();
  log("Cards loaded", cards);
  return cards;
}

export async function preload() {
  const [cards] = await Promise.all([loadCards(), loadWindow()]);
  return { cards };
}
