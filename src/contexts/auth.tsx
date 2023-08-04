'use client';

import useLocalStorage from '@/services/useLocalstorage';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState, createContext } from 'react';
import { toast } from 'react-hot-toast';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface SessionProps {
  access_token?: string;
  data?: {
    fullName: string;
    username: string;
    email: string;
  };
}

interface ContextProps {
  signIn: (data: SessionProps) => void;
  signOut: () => void;
  session: SessionProps;
  isLoggedUser: boolean;
  isLoading:boolean;
}

const AuthContext = createContext<ContextProps>({
	signIn: function (): void {},
	signOut: function (): void {},
	session: {},
	isLoggedUser: false,
	isLoading:true,
});

function AuthProvider({ children }: AuthProviderProps) {
	const [session, setSession] = useState<SessionProps>({});
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const route = useRouter();
	const isLoggedUser = !!session && !!session?.access_token;
	const storage = useLocalStorage();

	useEffect(() => {
		try {
			const sessionStorage = storage.getItem('session') as SessionProps;
			setIsLoading(true);
			if (sessionStorage.access_token) {
				setSession(sessionStorage);
				return;
			}
			setSession({});
		} catch (error) {
			setSession({});
			setIsLoading(false);
		}finally{
			setIsLoading(false);
		}
	}, []);

	function signIn(data: SessionProps) {
		if (data?.access_token) {
			storage.setItem('session', data);
			route.replace('/dashboard');
			setSession(data);
		}
	}

	function signOut() {
		route.push('/');
		storage.clear();
		setSession({});
		setIsLoading(true);
		toast.success('User logged out successfully!');
		setTimeout(() => setIsLoading(false), 100);
	}

	return (
		<AuthContext.Provider value={{ signIn, signOut, session, isLoggedUser, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}

export default AuthProvider;
