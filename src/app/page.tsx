'use client';

import Form from '@/components/form';
import CustomButton from '@/components/form/buttons/button';
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
	const { Post, isLoading } = useHttp({ url: 'auth/signIn' });
	const { handleSubmit, control, reset } = useForm<SignInProps>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			username: 'caioluan010',
			password: 'Caio@123'
		}
	});

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
			<TitleText
				variant="h4"
			>
          Welcome
			</TitleText>
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
			<CustomButton
				variant="contained"
				size='large'
				type='submit'
				disabled={isLoading}
				endIcon={<LoginIcon />}
			>
          Sign in
			</CustomButton>
		</Form>
	);
}