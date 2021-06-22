import React, { ChangeEvent, useEffect, useState } from 'react';
import 'features/Bucket/pages/BucketList/styles.scss';
import HeaderPage from 'components/HeaderPage';
import BucketTable from 'features/Bucket/components/BucketTable';
import { Button, Form, Input, message, Popconfirm, TablePaginationConfig, Popover } from 'antd';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import ModalCreateBucket from 'features/Bucket/components/ModalCreateBucket';
import { useHistory } from 'react-router';
import bucketApi from 'api/bucketApi';
import { reverse } from 'lodash';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { StopOutlined } from '@ant-design/icons';
import { EPermission } from 'constants/enum';

export interface IBucket {
  id: string;
  name: string;
  region: string;
  user: string;
  createDate: number;
  lastActivity: number;
}

const normalizeBucketResponse = (buckets: any) => {
  const newData = reverse(
    buckets?.map((bucket: any) => ({
      id: bucket?.id?.toString(),
      name: bucket?.name,
      region: bucket?.region,
      user: bucket?.username,
      createDate: bucket?.created_at,
      lastActivity: bucket?.last_update,
    })),
  );
  return newData;
};

function BucketList(): JSX.Element {
  const [loadingTable, setLoadingTable] = useState<boolean>(true);
  const [loadingCreateModal, setLoadingCreateModal] = useState<boolean>(false);
  const [selectedBucketKeys, setSelectedBucketKeys] = useState<React.Key[]>([]);
  const [visibleModalCreate, setVisibleModalCreate] = useState<boolean>(false);
  const [buckets, setBuckets] = useState<IBucket[]>([]);
  const { userInfo } = useSelector((state: RootState) => state.user);

  const [createBucketForm] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    //Todo: Call api to get bucket list
    if (userInfo?.permission === EPermission.NO_ACCESS) {
      setLoadingTable(false);
    } else {
      const root_id = userInfo?.owner ? userInfo?.owner._id : userInfo?.userId;
      bucketApi.getBuckets(root_id).then((res: { data: any }) => {
        let { data } = res;
        if (!data) data = [];
        const newData = normalizeBucketResponse(data);
        setBuckets(newData);
        setLoadingTable(false);
      });
    }
  }, []);

  //Create bucket
  const toggleModalCreate = () => {
    setVisibleModalCreate(!visibleModalCreate);
  };

  const handleCreateBucket = (): void => {
    setLoadingCreateModal(true);
    const bucketName = createBucketForm.getFieldValue('bucketName');
    const region = createBucketForm.getFieldValue('region');

    const root_id = userInfo?.owner ? userInfo?.owner?._id : userInfo.userId;

    bucketApi.createBucket(bucketName, region, userInfo?.userId, userInfo?.username, root_id).then((res: any) => {
      const currentTimestamp = Date.now();
      const newBucket = {
        id: `${res?.data?.id}`,
        name: bucketName,
        region: region,
        user: userInfo?.username,
        createDate: currentTimestamp,
        lastActivity: currentTimestamp,
      };
      setBuckets([newBucket, ...buckets]);
      toggleModalCreate();
      createBucketForm.resetFields();
      setLoadingCreateModal(false);
      message.info('Successful created');
    });
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
    selectedBucketKeys?.map((key: React.Key) => {
      bucketApi.deleteBucket(key?.toString());
    });
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

  const handleViewBucket = (id: string, bucketName: string): void => {
    history.push({ pathname: `/buckets/${id}`, state: { bucketName: bucketName } });
  };

  const handleDeleteBucket = (id: string): void => {
    message.info(`Successful deleted`);
    const newBuckets = buckets.filter((bucket: IBucket) => bucket?.id !== id);
    setBuckets(newBuckets);

    bucketApi.deleteBucket(id);
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
            {userInfo?.permission === EPermission.WRITE_ONLY || userInfo?.permission === EPermission.FULL_ACCESS ? (
              <Popconfirm
                title="Are you sure to delete?"
                onConfirm={handleDeleteMulBucket}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            ) : (
              <Popover content="Can't delete">
                <Button className="ml-2" type="primary" disabled>
                  Delete
                </Button>
              </Popover>
            )}

            {userInfo?.permission === EPermission.WRITE_ONLY || userInfo?.permission === EPermission.FULL_ACCESS ? (
              <Button className="ml-2" type="primary" onClick={toggleModalCreate}>
                Create
              </Button>
            ) : (
              <Popover content="Can't create">
                <Button className="ml-2" type="primary" disabled>
                  Create
                </Button>
              </Popover>
            )}
          </div>
        </div>
        <div className="mt-4" style={{ position: 'relative' }}>
          {userInfo?.permission === EPermission.NO_ACCESS && (
            <div className="bucket-table">
              <StopOutlined style={{ fontSize: 25 }} />
              <div className="mt-2">Can&apos;t access</div>
            </div>
          )}
          <BucketTable
            loading={loadingTable}
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
          loading={loadingCreateModal}
          form={createBucketForm}
        />
      </div>
    </>
  );
}

export default BucketList;
