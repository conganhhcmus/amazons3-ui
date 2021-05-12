import React, { ChangeEvent, useEffect, useState } from 'react';
import 'features/Bucket/pages/BucketList/styles.scss';
import HeaderPage from 'components/HeaderPage';
import BucketTable from 'features/Bucket/components/BucketTable';
import { range, reverse } from 'lodash';
import { Button, Form, Input, message, Popconfirm, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import ModalCreateBucket from 'features/Bucket/components/ModalCreateBucket';
import { useHistory } from 'react-router';
import moment from 'moment';
// import bucketApi from 'api/bucketApi';

const dummyData = reverse(
  range(0, 30, 1).map((index: number) => ({
    id: `${index}`,
    name: `Bucket name ${index}`,
    region: `Region ${index}`,
    user: `User ${index}`,
    createDate: '01/01/2021',
    lastActivity: '01/01/2021',
  })),
);

export interface IBucket {
  id: string;
  name: string;
  region: string;
  user: string;
  createDate: string;
  lastActivity: string;
}

function BucketList(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBucketKeys, setSelectedBucketKeys] = useState<React.Key[]>([]);
  const [visibleModalCreate, setVisibleModalCreate] = useState<boolean>(false);
  const [buckets, setBuckets] = useState<IBucket[]>([]);

  const [createBucketForm] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    //Todo: Call api to get bucket list
    // bucketApi.getBuckets().then((res: { data: IBucket[] }) => {
    //   const { data } = res;
    //   setBuckets(data);
    //   setLoading(false);
    // });
    setLoading(true);
    setTimeout(() => {
      setBuckets(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  //Create bucket
  const toggleModalCreate = () => {
    setVisibleModalCreate(!visibleModalCreate);
  };

  const handleCreateBucket = (): void => {
    const bucketName = createBucketForm.getFieldValue('bucketName');
    const region = createBucketForm.getFieldValue('region');
    const currentTimestamp = Date.now();
    const newBucket = {
      id: `${buckets.length}`,
      name: bucketName,
      region: region,
      user: `User ${buckets.length}`,
      createDate: moment(currentTimestamp).format('DD/MM/YYYY'),
      lastActivity: moment(currentTimestamp).format('DD/MM/YYYY'),
    };
    setBuckets([newBucket, ...buckets]);
    message.info('Successful created');
    toggleModalCreate();
    createBucketForm.resetFields();
  };

  //Delete bucket
  const handleDeleteMulBucket = () => {
    if (!selectedBucketKeys.length) {
      message.warning('Please select at least one bucket');
      return;
    }
    const newBuckets = buckets.filter((bucket: IBucket) => {
      let isOk = true;
      selectedBucketKeys.map((key: React.Key) => {
        if (bucket?.id === key) {
          isOk = false;
        }
      });
      return isOk;
    });
    setBuckets(newBuckets);
    message.info('Successful deleted');
  };

  //Search
  let timeout: NodeJS.Timeout;
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
  const handleSelect = (selectedRowKeys: React.Key[], selectedRows: IBucket[]): void => {
    console.log('🚀 ~ file: index.tsx ~ line 58 ~ handleChangeSelect ~ selectedRows', selectedRows);
    console.log('🚀 ~ file: index.tsx ~ line 58 ~ handleChangeSelect ~ selectedRowKeys', selectedRowKeys);
    setSelectedBucketKeys(selectedRowKeys);
  };

  const handleChange = (
    pagination: TablePaginationConfig,
    filter: Record<string, FilterValue | null>,
    sorter: SorterResult<IBucket> | SorterResult<IBucket>[],
  ): void => {
    console.log('🚀 ~ file: index.tsx ~ line 72 ~ handleChange ~ pagination', pagination);
    console.log('🚀 ~ file: index.tsx ~ line 72 ~ handleChange ~ sorter', sorter);
  };

  const handleViewBucket = (id: string): void => {
    history.push(`/buckets/${id}`);
  };

  const handleDeleteBucket = (id: string): void => {
    message.info(`Successful deleted`);
    const newBuckets = buckets.filter((bucket: IBucket) => bucket?.id !== id);
    setBuckets(newBuckets);
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
            <Popconfirm title="Are you sure to delete?" onConfirm={handleDeleteMulBucket} okText="Yes" cancelText="No">
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
            <Button className="ml-2" type="primary" onClick={toggleModalCreate}>
              Create
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <BucketTable
            loading={loading}
            data={buckets}
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
