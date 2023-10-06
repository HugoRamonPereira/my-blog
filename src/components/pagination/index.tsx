import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationProps {
  totalPages: number;
  onChangePage(pageNumber: number): void;
}

export default function PaginationRounded({ totalPages, onChangePage }: PaginationProps) {
	return (
		<Stack spacing={2}>
			<Pagination count={totalPages} variant="outlined" shape="rounded" onChange={(e, value) => onChangePage(value)} />
		</Stack>
	);
}
