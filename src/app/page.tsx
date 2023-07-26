import Form from '@/components/form';
import InputBase from '@/components/form/inputs/inputBase';
import InputPassword from '@/components/form/inputs/inputPassword';

export default function Home() {
	return (
		<Form>
			<InputBase label='Fullname' />
			<InputBase label='Username' />
			<InputBase label='Email' type='email' />
			<InputPassword label='Password' />
			<InputPassword label='Confirm password' />
		</Form>
	);
}
