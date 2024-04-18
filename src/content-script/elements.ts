export function wrapElement(
  element: "div" | "span" | "b" | "img",
  opts: {
    children?: string | string[];
    attributes?: { [key: string]: string | number };
  }
) {
  const tag = `<${element}${Object.entries(opts?.attributes || {}).map(
    ([key, value]) => ` ${key}="${value}"`
  )}${opts.children ? "" : "/"}>`;
  if (!opts.children) {
    return tag;
  }
  const tagClose = `</${element}>`;
  return `${tag}${
    Array.isArray(opts.children) ? opts.children.join("") : opts.children
  }${tagClose}`;
}

function generateCardPreview(card: Card) {
  return wrapElement("div", {
    attributes: {
      class: "mswh-card-preview",
      "data-card-type": card.type,
    },
    children: [
      wrapElement("img", {
        attributes: {
          src: `https://images.marvelsnap.io/images/cards/${card.id}.webp`,
          alt: card.name,
        },
      }),
      wrapElement("div", { children: generateAbilityText(card.ability) }),
    ],
  });
}

function generateAbilityText(ability: string) {
  return ability
    .replace("On Reveal:", wrapElement("b", { children: "On Reveal:" }))
    .replace("Ongoing:", wrapElement("b", { children: "Ongoing:" }));
}

export function generateCardSpan(card: Card) {
  return wrapElement("span", {
    attributes: { class: "mswh-card", "data-id": card.id },
    children: [card.name, generateCardPreview(card)],
  });
}
