interface Card {
  ability: string;
  cost: number;
  date_added: string;
  id: number;
  method: string;
  name: string;
  power: number;
  pretty_url: string;
  slug: string;
  status: string;
  type: "Character" | "Location" | "Summon";
  variants: string;
}

interface LocalCardData {
  fetchedAt: string;
  cards: Card[];
}
