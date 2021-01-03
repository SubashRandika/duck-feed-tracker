import { notification } from 'antd';

export const showNotification = (message, description, type) => {
	notification[type]({
		message,
		description
	});
};
