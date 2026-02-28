import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  user: { id: string; email: string; fullName?: string } | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_EMAIL = "jatin@gmail.com";
const DEMO_PASSWORD = "P@ssword@123";
const DEMO_FULL_NAME = "Jatin";
const STORAGE_KEY = "epuja_demo_auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { email: string; fullName?: string } | null;
        if (parsed?.email === DEMO_EMAIL) {
          setUser({ id: "demo-jatin", email: parsed.email, fullName: parsed.fullName ?? DEMO_FULL_NAME });
        }
      }
    } catch {
      // ignore corrupt storage
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    void email;
    void password;
    void fullName;
    throw new Error(`Demo mode: use ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
  };

  const signIn = async (email: string, password: string) => {
    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      throw new Error("Invalid demo credentials");
    }
    const nextUser = { id: "demo-jatin", email: DEMO_EMAIL, fullName: DEMO_FULL_NAME };
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: nextUser.email, fullName: nextUser.fullName }));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo<AuthContextType>(() => ({ user, loading, signUp, signIn, signOut }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
