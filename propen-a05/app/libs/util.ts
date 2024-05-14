export const formatDate = (date: Date) => {
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	} as const;

	const format = new Intl.DateTimeFormat('en-US', options);
	return format.format(date);
};