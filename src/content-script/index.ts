import { createPopper } from "@popperjs/core";
import "./assets/card-background.webp";
import { generateCardSpan } from "./elements";
import { log } from "./logger";
import { preload } from "./preload";
import "./styles.scss";

async function run() {
  const { cards } = await preload();

  // Get all paragraphs from the page
  const pEls = document.querySelectorAll("p:not(:has(*))");
  const paragraphs: string[] = [];
  for (const p of pEls) {
    paragraphs.push(p.innerHTML);
  }
  log(`Found ${paragraphs.length} paragraphs`, paragraphs);

  // Wrap spans around all the card references
  pEls.forEach((pEl) => {
    let nextInnerHTML = pEl.innerHTML;
    cards.forEach((card) => {
      const regex = new RegExp(`(${card.name})(?!</span>)`, "gi");
      if (regex.test(nextInnerHTML)) {
        log(`Adding span wrapper to ${card.name}`);
        nextInnerHTML = nextInnerHTML.replace(regex, generateCardSpan(card));
      }
    });
    pEl.innerHTML = nextInnerHTML;
  });

  // Add poppers to card references
  const cardEls = document.querySelectorAll<HTMLSpanElement>("span.mswh-card");
  cardEls.forEach((cardEl) => {
    log("Attempting to add popper to card");
    const previewEl = cardEl.querySelector<HTMLDivElement>(
      "div.mswh-card-preview"
    );
    if (!previewEl) return log("No preview element found on card");
    const popper = createPopper(cardEl, previewEl, {
      placement: "bottom",
      modifiers: [
        {
          enabled: true,
          name: "offset",
          options: {
            offset: [0, 20],
            padding: 0,
          },
        },
      ],
    });
    log("Added popper to card");

    cardEl.addEventListener("mouseenter", () => {
      // log("Mouse entered card");
      previewEl.setAttribute("data-show", "");
      popper.update();
    });

    cardEl.addEventListener("mouseleave", () => {
      // log("Mouse left card");
      previewEl.removeAttribute("data-show");
    });
  });

  log("Reached the end of the run() method");
}

log("Loaded content script");
run();
