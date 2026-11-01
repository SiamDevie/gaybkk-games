export const CONTENT_RATINGS = ["SPICY", "HOT", "XXX", "AFTER_DARK"] as const;

export type ContentRating = (typeof CONTENT_RATINGS)[number];

export type GameStatus = "available" | "coming-soon";
export type GameCategory = "casual" | "party" | "quiz" | "story";
export type GameMode = "solo" | "party-local";

export type GameDefinition = {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  description: string;
  category: GameCategory;
  status: GameStatus;
  contentRating: ContentRating;
  contentWarnings: readonly string[];
  accessPolicyId: "adult-platform" | "adult-restricted-media";
  modes: readonly GameMode[];
  minPlayers: number;
  maxPlayers: number;
  rulesVersion: string;
  leaderboardEnabled: boolean;
  accent: "pink" | "violet" | "cyan" | "lime" | "orange";
  icon: string;
};
