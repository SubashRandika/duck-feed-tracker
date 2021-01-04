import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

function Container({ children }) {
	return <Content>{children}</Content>;
}

export default Container;
