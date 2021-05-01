import { Table, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import React, { ChangeEvent } from 'react';

export interface IObjectRow {
  id: number;
  name: string;
  folder: string;
  type: string;
  size: string;
  dateModified: string;
}

interface IObjectTable {
  loading: boolean;
  data: IObjectRow[];
  parentID: number;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (
    pagination: TablePaginationConfig,
    filter: Record<string, FilterValue | null>,
    sorter: SorterResult<IObjectRow> | SorterResult<IObjectRow>[],
  ) => void;
  onSelect: (selectedRowKeys: React.Key[], selectedRows: IObjectRow[]) => void;
  onViewDetail: (bucketID: number, objectID: number) => void;
}

function ObjectTable(props: IObjectTable): JSX.Element {
  const { loading = true, data = [], parentID ,onChange, onSelect, onViewDetail } = props;

  const columns = [
    {
      title: 'Object name',
      dataIndex: 'name',
      fixed: true,
      sorter: true,
      sortDirection: ['descend', 'ascend'],
      // eslint-disable-next-line react/display-name
      render: (text: string, record: IObjectRow) => <a onClick={() => onViewDetail(parentID, record?.id,)} >{text}</a>,
    },
    {
      title: 'Folder',
      dataIndex: 'folder',
      sorter: true,
      sortDirection: ['descend', 'ascend'],
      width: '150px',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sortDirection: ['descend', 'ascend'],
      sorter: true,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      sortDirection: ['descend', 'ascend'],
      sorter: true,
    },
    {
      title: 'Date modified',
      dataIndex: 'dateModified',
      sortDirection: ['descend', 'ascend'],
      sorter: true,
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

export default ObjectTable;
