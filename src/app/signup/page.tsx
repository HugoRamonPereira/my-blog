'use client';

import Form from '@/components/form';
import CustomButton from '@/components/form/buttons/button';
import CustomLink from '@/components/form/buttons/link';
import InputBase from '@/components/form/inputs/inputBase';
import InputPassword from '@/components/form/inputs/inputPassword';
import useHttp from '@/services/useHttp';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import * as Styled from './styles';

interface SignUpProps {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signUpFormSchema = z.object({
	fullName: z.string(),
	username: z.string(),
	email: z.string().email(),
	password: z.string().min(3).max(20),
	confirmPassword: z.string().min(3).max(20),
}).refine((data) => data.password === data.confirmPassword, {
	message: 'Passwords don&apos;t match',
	path: ['confirmPassword']
});

export default function SignUp() {
	const { Post, isLoading } = useHttp({ url: 'auth/signUp' });
	const router = useRouter();
	const { handleSubmit, control, reset } = useForm<SignUpProps>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			fullName: 'ramon',
			username: 'ramonp',
			email: 'ramone.techie@gmail.com',
			password: '0123456789',
			confirmPassword: '0123456789'
		}
	});

	async function onSubmit(data: SignUpProps){
		const response = await Post({ body: {...data} });

		if(response) {
			toast.success('Account created successfully!');
			reset();
			router.push('/');
			return;
		}
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
		>
			<Styled.Title
				variant="h4"
			>
        Create your account
			</Styled.Title>
			<InputBase
				label='Full Name'
				name='fullName'
				control={control}
			/>
			<InputBase
				label='Username'
				name='username'
				control={control}
			/>
			<InputBase
				label='Email'
				name='email'
				control={control}
			/>
			<InputPassword
				label='Password'
				name='password'
				control={control}
			/>
			<InputPassword
				label='Confirm password'
				name='confirmPassword'
				control={control}
			/>
			<CustomButton
				variant="contained"
				size='large'
				type='submit'
				disabled={isLoading}
			>
            Sign up
			</CustomButton>
			<CustomLink
				href='/'
			>
        Back home
			</CustomLink>
		</Form>
	);
}