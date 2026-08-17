import { describe, expect, it } from "vitest";
import {
  recommendCasinos,
  scoreCasino,
} from "../app/utils/recommendCasinos.js";

const casinos = [
  {
    id: "north-star",
    name: "North Star Casino",
    matchingAnswers: ["new-player", "welcome-bonus", "slots", "mobile"],
  },
  {
    id: "harbour-bet",
    name: "Harbour Bet",
    matchingAnswers: [
      "experienced-player",
      "fast-payouts",
      "sports-betting",
      "desktop",
    ],
  },
  {
    id: "lucky-lantern",
    name: "Lucky Lantern",
    matchingAnswers: [
      "new-player",
      "welcome-bonus",
      "live-casino",
      "live-games",
      "mobile",
    ],
  },
  {
    id: "summit-play",
    name: "Summit Play",
    matchingAnswers: [
      "experienced-player",
      "fast-payouts",
      "live-casino",
      "live-games",
      "desktop",
    ],
  },
];

describe("scoreCasino", () => {
  it("counts overlapping option ids", () => {
    expect(
      scoreCasino(
        casinos.find((c) => c.id === "north-star"),
        ["new-player", "welcome-bonus", "slots", "mobile"],
      ),
    ).toBe(4);
    expect(
      scoreCasino(
        casinos.find((c) => c.id === "north-star"),
        ["new-player", "mobile"],
      ),
    ).toBe(2);
    expect(
      scoreCasino(
        casinos.find((c) => c.id === "north-star"),
        ["desktop"],
      ),
    ).toBe(0);
  });
});

describe("recommendCasinos", () => {
  it("ranks the perfect north-star answers first", () => {
    const ranked = recommendCasinos(casinos, [
      "new-player",
      "welcome-bonus",
      "slots",
      "mobile",
    ]);

    expect(ranked.map((casino) => casino.id)).toEqual([
      "north-star",
      "lucky-lantern",
      "harbour-bet",
      "summit-play",
    ]);
    expect(ranked[0].score).toBe(4);
    expect(ranked[1].score).toBe(3);
  });
});
