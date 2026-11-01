export type AuthState =
  | { status: "guest" }
  | { status: "authenticated"; uid: string; displayName: string | null };

export interface AuthService {
  getCurrentUser(): Promise<AuthState>;
  signOut(): Promise<void>;
}

// Authentication and cross-subdomain session handoff are intentionally not
// implemented until the identity contract with gaybkk.co has been verified.
