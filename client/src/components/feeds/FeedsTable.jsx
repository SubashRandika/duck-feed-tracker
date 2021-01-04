import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Table, Switch, Space, Tooltip, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import FeedColumns from './FeedColumns';

function FeedsTable({ feeds }) {
	dayjs.extend(relativeTime);

	const dataSource = feeds.map((feed, index) => ({
		key: index + 1,
		foodName: feed.foodName,
		foodCategory: feed.foodCategory.name,
		foodQuantity: feed.foodQuantity,
		duckCount: feed.duckCount,
		address: feed.address,
		coordinates: `${feed.location.coordinates[0]} / ${feed.location.coordinates[1]}`,
		feedDate: dayjs(feed.dateTime).format('ddd, MMM DD, YYYY h:mm a'),
		createdAt: dayjs(feed.createdAt).fromNow(),
		isScheduled: feed.isScheduled
	}));

	const handleScheduledChange = (checked) => {
		//TODO: handle actions related schedule the feed.

		console.log('Feed schedule/pause action performed', checked);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		//TODO: handle actions related update the feed.

		console.log('Update feed action performed');
	};

	const handleDelete = (e) => {
		e.preventDefault();
		//TODO: handle actions related update the feed.

		console.log('Delete feed action performed');
	};

	const columns = [
		...FeedColumns,
		{
			title: 'Schedule',
			dataIndex: 'isScheduled',
			key: 'isScheduled',
			render: (checked) => (
				<Switch
					size='large'
					checkedChildren='Scheduled'
					unCheckedChildren='Paused'
					onChange={handleScheduledChange}
				/>
			)
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			key: 'actions',
			render: () => (
				<Space>
					<Tooltip title='Edit Feed'>
						<Button
							shape='circle'
							icon={<EditOutlined />}
							onClick={handleUpdate}
						/>
					</Tooltip>
					<Tooltip title='Delete Feed'>
						<Button
							shape='circle'
							icon={<DeleteOutlined />}
							danger
							onClick={handleDelete}
						/>
					</Tooltip>
				</Space>
			)
		}
	];

	return <Table dataSource={dataSource} columns={columns} />;
}

FeedsTable.propTypes = {
	feeds: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FeedsTable;
