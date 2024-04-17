import { getCards } from "./cards";
import { log } from "./logger";

async function loadCards() {
  log("Loading up cards");
  const cards = await getCards();
  log("Cards loaded", cards);
}

async function windowLoaded() {
  log("Window loaded");
}

window.addEventListener("load", windowLoaded);
log("Loaded content script");
loadCards();
