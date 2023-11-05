import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import * as Styled from './styles';

interface PaginationProps {
  totalPages: number;
  onChangePage(pageNumber: number): void;
}

export default function PaginationRounded({ totalPages, onChangePage }: PaginationProps) {
	return (
		<Styled.PaginationContainer
			spacing={2}
		>
			<Pagination
				count={totalPages}
				variant="outlined"
				shape="rounded"
				onChange={(e, value) => onChangePage(value)}
				color='primary'
			/>
		</Styled.PaginationContainer>
	);
}
