import React, { ChangeEvent, useEffect, useState } from 'react';
import 'features/Bucket/pages/BucketList/styles.scss';
import HeaderPage from 'components/HeaderPage';
import BucketTable, { IBucketRow } from 'features/Bucket/components/BucketTable';
import { range } from 'lodash';
import { Button, Form, Input, message, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import ModalCreateBucket from 'features/Bucket/components/ModalCreateBucket';
import { useHistory } from 'react-router';

const dummyData = range(0, 30, 1).map((index: number) => ({
  id: index,
  name: `Bucket name ${index}`,
  region: `Region ${index}`,
  user: `User ${index}`,
  createDate: '01/01/2021',
  lastActivity: '01/01/2021',
}));

function BucketList(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBucketKeys, setSelectedBucketKeys] = useState<React.Key[]>([]);
  const [visibleModalCreate, setVisibleModalCreate] = useState<boolean>(false);

  const [createBucketForm] = Form.useForm();
  const history = useHistory();

  //Create bucket
  const toggleModalCreate = () => {
    setVisibleModalCreate(!visibleModalCreate);
  };

  const handleCreateBucket = (): void => {
    message.info('Create bucket');
    toggleModalCreate();
    createBucketForm.resetFields();
  };

  //Delete bucket
  const handleDeleteMulBucket = () => {
    if (!selectedBucketKeys.length) {
      message.warning('Please select at least one bucket');
      return;
    }
    console.log('Delete: ');
    console.log({ selectedBucketKeys });
    message.info('Delete multi bucket');
  };

  //Search
  let timeout: NodeJS.Timeout;
  useEffect(() => {
    //Todo: Call api to get bucket list
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      message.info(`Searching with ${value}`);
    }, 500);
  };

  //Table
  const handleSelect = (selectedRowKeys: React.Key[], selectedRows: IBucketRow[]): void => {
    console.log('🚀 ~ file: index.tsx ~ line 58 ~ handleChangeSelect ~ selectedRows', selectedRows);
    console.log('🚀 ~ file: index.tsx ~ line 58 ~ handleChangeSelect ~ selectedRowKeys', selectedRowKeys);
    setSelectedBucketKeys(selectedRowKeys);
  };

  const handleChange = (
    pagination: TablePaginationConfig,
    filter: Record<string, FilterValue | null>,
    sorter: SorterResult<IBucketRow> | SorterResult<IBucketRow>[],
  ): void => {
    console.log('🚀 ~ file: index.tsx ~ line 72 ~ handleChange ~ pagination', pagination);
    console.log('🚀 ~ file: index.tsx ~ line 72 ~ handleChange ~ sorter', sorter);
  };

  const handleViewBucket = (id: number): void => {
    history.push(`/buckets/${id}`);
  };

  const handleDeleteBucket = (id: number): void => {
    message.info(`Delete bucket id = ${id}`);
  };

  return (
    <>
      <HeaderPage
        title="Bucket"
        breadcrumbs={[
          {
            label: 'Bucket',
            path: '/buckets',
          },
        ]}
      />
      <div className="bucket-table-container">
        <div className="d-flex justify-content-between">
          <div className="bucket-table-container__search">
            <Input size="large" placeholder="Search..." prefix={<SearchOutlined />} onChange={handleSearch} />
          </div>
          <div className="bucket-table-container__actions">
            <Button type="primary" danger onClick={handleDeleteMulBucket}>
              Delete
            </Button>
            <Button className="ml-2" type="primary" onClick={toggleModalCreate}>
              Create
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <BucketTable
            loading={loading}
            data={dummyData}
            onChange={handleChange}
            onSelect={handleSelect}
            onSearch={handleSearch}
            onViewDetail={handleViewBucket}
            onDelete={handleDeleteBucket}
          />
        </div>
        <ModalCreateBucket
          visible={visibleModalCreate}
          onCancel={toggleModalCreate}
          onOk={handleCreateBucket}
          loading={loading}
          form={createBucketForm}
        />
      </div>
    </>
  );
}

export default BucketList;
