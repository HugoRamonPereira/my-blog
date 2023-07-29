'use client';

import { Toaster as ToasterProvider } from 'react-hot-toast';

function Toaster(){
	return (
		<ToasterProvider
			position='bottom-center'
			toastOptions={{
				success: {
					style: {
						background: '#48BB78',
						color: '#FFFFFF',
					},
					iconTheme: {
						primary: '#FFFFFF',
						secondary: '#48BB78'
					}
				},
				error: {
					style: {
						background: '#E53E3E',
						color: '#FFFFFF',
					},
					iconTheme: {
						primary: '#FFFFFF',
						secondary: '#E53E3E'
					}
				}
			}}
		/>
	);
}

export default Toaster;