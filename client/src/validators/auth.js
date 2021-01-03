export const requiredValidator = (field) => ({
	required: true,
	message: `Please enter your ${field}`
});

export const emailValidator = () => ({
	type: 'email',
	message: 'Please enter valid email'
});

export const whitespaceValidator = (field) => ({
	whitespace: true,
	message: `${field} contains preceding whitespace`
});
