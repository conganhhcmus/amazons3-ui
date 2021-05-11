import { Table, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import IconTrash from 'assets/icon/IconTrash';
import IconView from 'assets/icon/IconView';
import 'features/Bucket/components/BucketTable/styles.scss';
import { IBucket } from 'features/Bucket/pages/BucketList';
import React, { ChangeEvent } from 'react';

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
  onViewDetail: (id: string) => void;
  onDelete: (id: string) => void;
}

function BucketTable(props: IBucketTable): JSX.Element {
  const { loading = true, data = [], onChange, onSelect, onViewDetail, onDelete } = props;

  const columns = [
    {
      title: 'Bucket name',
      dataIndex: 'name',
      fixed: true,
      sorter: true,
      sortDirection: ['descend', 'ascend'],
    },
    {
      title: 'Region',
      dataIndex: 'region',
      sorter: true,
      sortDirection: ['descend', 'ascend'],
      width: '150px',
    },
    {
      title: 'User create',
      dataIndex: 'user',
      sortDirection: ['descend', 'ascend'],
      sorter: true,
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      sortDirection: ['descend', 'ascend'],
      sorter: true,
    },
    {
      title: 'Last activity',
      dataIndex: 'lastActivity',
      sortDirection: ['descend', 'ascend'],
      sorter: true,
    },
    {
      title: 'Action',
      width: '80px',
      // eslint-disable-next-line react/display-name
      render: (record: IBucket) => (
        <div className="d-flex justify-content-around align-items-center">
          <div className="cursor-pointer" onClick={() => onViewDetail(record?.id)}>
            <IconView />
          </div>
          <div className="cursor-pointer" onClick={() => onDelete(record?.id)}>
            <IconTrash />
          </div>
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
