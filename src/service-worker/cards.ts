import { log } from "./logger";

export async function getCards(): Promise<Card[]> {
  const url =
    "https://marvelsnap.io/api/search.php?database&sort=name&limit=1000&offset=0";
  let cards: Card[] = [];
  log("Attempt to fetch cards");

  try {
    const res = await fetch(url);
    log("Fetch response received");

    const json = await res.json();

    cards = json.card;
    log("Card response contains valid JSON");
  } catch (e) {
    log(e);
  }

  log("Cards", cards);
  return cards;
}

export async function handleSendCards(
  sendResponse: (response: unknown) => void
) {
  const cards = await getCards();
  sendResponse(cards);
  log(`Sent response`);
}
