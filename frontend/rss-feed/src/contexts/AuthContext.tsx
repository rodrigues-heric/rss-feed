import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { userService } from '@/services/user.service';
import type { Feed } from '@/interfaces/feed.interface';

interface User {
  _id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  feeds: Feed[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: any) => void;
  logout: () => void;
  setFeeds: React.Dispatch<React.SetStateAction<Feed[]>>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const userData = await userService.getMe();
      setUser(userData);

      const { feeds: userFeeds } = await userService.getSubscriptions();
      setFeeds(userFeeds);
    } catch (error) {
      setUser(null);
      setFeeds([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await userService.logout();
    } finally {
      setUser(null);
      setFeeds([]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        feeds,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        setFeeds,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
