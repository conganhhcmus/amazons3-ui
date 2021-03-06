import { Popconfirm, Table, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import IconTrash from 'assets/icon/IconTrash';
import IconView from 'assets/icon/IconView';
import 'features/Bucket/components/BucketTable/styles.scss';
import { IBucket } from 'features/Bucket/pages/BucketList';
import React, { ChangeEvent } from 'react';
import moment from 'moment';

interface IBucketTable {
  loading: boolean;
  data: IBucket[];
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (
    pagination: TablePaginationConfig,
    filter: Record<string, FilterValue | null>,
    sorter: SorterResult<IBucket> | SorterResult<IBucket>[],
  ) => void;
  onSelect: (selectedRowKeys: React.Key[], selectedRows: IBucket[]) => void;
  onViewDetail: (id: string, bucketName: string) => void;
  onDelete: (id: string) => void;
}

function BucketTable(props: IBucketTable): JSX.Element {
  const { loading = true, data = [], onChange, onSelect, onViewDetail, onDelete } = props;

  const columns: any = [
    {
      title: 'Bucket name',
      dataIndex: 'name',
      fixed: true,
      sortDirection: ['descend', 'ascend'],
      sorter: (bucket1: IBucket, bucket2: IBucket) => {
        if (bucket1.name > bucket2.name) return 1;
        if (bucket1.name < bucket2.name) return -1;
        return 0;
      },
      // eslint-disable-next-line react/display-name
      render: (text: string, record: IBucket) => <a onClick={() => onViewDetail(record?.id, record?.name)}>{text}</a>,
    },
    {
      title: 'Region',
      dataIndex: 'region',
      sortDirection: ['descend', 'ascend'],
      sorter: (bucket1: IBucket, bucket2: IBucket) => {
        if (bucket1.region > bucket2.region) return 1;
        if (bucket1.region < bucket2.region) return -1;
        return 0;
      },
      width: '150px',
      align: 'center',
    },
    {
      title: 'User create',
      dataIndex: 'user',
      sortDirection: ['descend', 'ascend'],
      sorter: (bucket1: IBucket, bucket2: IBucket) => {
        if (bucket1.user > bucket2.user) return 1;
        if (bucket1.user < bucket2.user) return -1;
        return 0;
      },
      align: 'center',
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      sortDirection: ['descend', 'ascend'],
      sorter: (bucket1: IBucket, bucket2: IBucket) => {
        if (new Date(bucket1.createDate) > new Date(bucket2.createDate)) return 1;
        if (new Date(bucket1.createDate) < new Date(bucket2.createDate)) return -1;
        return 0;
      },
      align: 'center',
      render: (date: number) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Last activity',
      dataIndex: 'lastActivity',
      sortDirection: ['descend', 'ascend'],
      sorter: (bucket1: IBucket, bucket2: IBucket) => {
        if (new Date(bucket1.lastActivity) > new Date(bucket2.lastActivity)) return 1;
        if (new Date(bucket1.lastActivity) < new Date(bucket2.lastActivity)) return -1;
        return 0;
      },
      align: 'center',
      render: (date: number) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Action',
      width: '80px',
      // eslint-disable-next-line react/display-name
      render: (record: IBucket) => (
        <div className="d-flex justify-content-around align-items-center">

          {/* <div className="cursor-pointer" onClick={() => onViewDetail(record?.id)}>
            <IconView />
          </div> */}
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => onDelete(record?.id)}
            okText="Yes"
            cancelText="No"
          >
            <div className="cursor-pointer">
              <IconTrash />
            </div>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      className="bucket-table-container__table"
      loading={loading}
      columns={columns}
      dataSource={data}
      rowSelection={{ type: 'checkbox', onChange: onSelect }}
      scroll={{ x: 1000, y: 400 }}
      pagination={{ pageSize: 10 }}
      onChange={onChange}
    />
  );
}

export default BucketTable;
