import { differenceInDays } from "date-fns";
import { log } from "./logger";

export async function getCards(): Promise<Card[]> {
  log("Get cards");
  const localCardDataStr = localStorage.getItem("card-data");
  if (localCardDataStr) {
    log("Card data exists in local storage");
    try {
      const localCardData: LocalCardData = JSON.parse(localCardDataStr);
      log("Card data parsed as valid JSON");
      const now = new Date();
      if (localCardData) {
        log("Last card data fetch was at ", localCardData.fetchedAt);
        const fetchedAt = new Date(localCardData.fetchedAt);
        const fetchedXDaysAgo = differenceInDays(fetchedAt, now);
        if (fetchedXDaysAgo < 1) {
          log(
            "Card data was fetched less than a day ago. Using local card data."
          );
          if (
            !localCardData ||
            !localCardData.cards ||
            !localCardData.cards.length
          ) {
            log("Cache malformed, clearing");
            localStorage.removeItem("card-data");
          } else {
            const cards = localCardData.cards;

            // Sort cards by name length so that longer names get matched first
            cards.sort((a, b) => b.name.localeCompare(a.name));

            return cards;
          }
        } else {
          log(
            `Card data was fetched ${fetchedXDaysAgo} days ago. Fetching new card data.`
          );
        }
      }
    } catch (e) {
      log(e);
    }
  }

  log("Request cards from service worker");
  const cards: Card[] = await chrome.runtime.sendMessage("request-cards");
  log("Received cards", cards);

  try {
    if (!cards || !cards.length) {
      log("Bad cards", cards);
      throw new Error("No cards available to cache");
    }
    const nextLocalCardData: LocalCardData = {
      cards: cards,
      fetchedAt: new Date().toISOString(),
    };
    localStorage.setItem("card-data", JSON.stringify(nextLocalCardData));
    log("Cached card data");
  } catch (e) {
    log(e);
  }

  return cards;
}
