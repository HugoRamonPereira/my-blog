'use client';

import Form from '@/components/form';
import CustomLink from '@/components/form/buttons/link';
import InputBase from '@/components/form/inputs/inputBase';
import InputPassword from '@/components/form/inputs/inputPassword';
import TitleText from '@/components/titleText';
import useHttp from '@/services/useHttp';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/auth';
import { LoadingBtn } from '@/components/form/buttons/loadingButton';
import Spinner from '@/assets/loading-spinner.svg';
import Image from 'next/image';

interface SignInProps {
  username: string;
  password: string;
}

const signInFormSchema = z.object({
	username: z.string(),
	password: z.string().min(3).max(20)
});

export default function SignIn() {
	const auth = useAuth();
	const { handleSubmit, control, reset, setError } = useForm<SignInProps>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			username: 'caioluan010',
			password: 'Caio@123'
		}
	});
	const { Post, isLoading } = useHttp({ url: 'auth/signIn', setError: setError });
	console.log('setError:', setError);

	async function onSubmit(data: SignInProps) {
		const response = await Post({ body: {...data} });

		if(response.access_token){
			toast.success('Login successful!');
			auth.signIn(response);
			reset();
			return;
		}

		toast.error('Login failed!');
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
		>
			<TitleText>Welcome</TitleText>
			<InputBase
				label='Username'
				name='username'
				control={control}
			/>
			<InputPassword
				label='Password'
				name='password'
				control={control}
			/>
			<CustomLink
				href='/signup'
			>
          Don&apos;t have an account?
			</CustomLink>
			<LoadingBtn
				variant="contained"
				type='submit'
				size='large'
				loading={isLoading}
				loadingIndicator={<Image src={Spinner} width={25} height={25} alt='spinner' />}
				endIcon={<LoginIcon />}
			>
				Sign in
			</LoadingBtn>
		</Form>
	);
}