'use client';

import Form from '@/components/form';
import CustomButton from '@/components/form/buttons/button';
import CustomLink from '@/components/form/buttons/link';
import InputBase from '@/components/form/inputs/inputBase';
import InputPassword from '@/components/form/inputs/inputPassword';
import TitleText from '@/components/titleText';
import useHttp from '@/services/useHttp';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

interface SignInProps {
  email: string;
  password: string;
}

const signInFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(3).max(20)
});

export default function Home() {
	const { Get, errorRequest } = useHttp({ url: 'auth/signIn' });
	const { handleSubmit, control, formState } = useForm<SignInProps>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: 'ramone.techie@gmail.com'
		}
	});

	console.log(formState);

	async function onSubmit(data: SignInProps) {
		console.log(data);
		await Get(data);

		if(!errorRequest) {
			toast.success('Login successful!');
			return;
		}
		toast.error('Some sort of error ocurred!');
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
		>
			<TitleText
				variant="h4"
				sx={{
					marginBottom: '1rem'
				}}
			>
          Welcome
			</TitleText>
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
			<CustomLink
				href='/signup'
			>
          Don&apos;t have an account?
			</CustomLink>
			<CustomButton
				variant="contained"
				size='large'
				type='submit'
			>
          Sign in
			</CustomButton>
		</Form>
	);
}