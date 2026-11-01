export type AccessPolicy = {
  id: "adult-platform" | "adult-restricted-media";
  minimumAge: 18;
  requiresVerifiedAge: boolean;
  restrictedMediaAllowed: boolean;
  description: string;
};

export const ACCESS_POLICIES: Record<AccessPolicy["id"], AccessPolicy> = {
  "adult-platform": {
    id: "adult-platform",
    minimumAge: 18,
    requiresVerifiedAge: false,
    restrictedMediaAllowed: false,
    description:
      "Preliminary 18+ experience gate. Restricted adult media remains unavailable.",
  },
  "adult-restricted-media": {
    id: "adult-restricted-media",
    minimumAge: 18,
    requiresVerifiedAge: true,
    restrictedMediaAllowed: true,
    description:
      "Reserved for a future verified-age and region-aware access flow.",
  },
};
