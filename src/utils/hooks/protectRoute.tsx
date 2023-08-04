'use client';

import { useAuth } from '@/contexts/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface ProtectRouteProps {
  children: React.ReactNode;
}

const publicPages = ['/', '/signup'];

function ProtectRoute({ children }: ProtectRouteProps) {
	const { isLoggedUser, isLoading } = useAuth();
	const route = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (isLoggedUser || isLoading || publicPages.includes(pathname)) return;

		route.replace('/');
		toast.error('User not authorized!');
	}, [isLoggedUser, isLoading, pathname]);

	if(isLoading){
		return <div><center><span>Loading...</span></center></div>;
	}

	if (isLoggedUser || publicPages.includes(pathname)) {
		return children;
	}
	return null;
}

export default ProtectRoute;
