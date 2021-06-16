import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import HeaderPage from 'components/HeaderPage';
import { Button, Input, message, TablePaginationConfig, Dropdown, Menu, Form } from 'antd';
import { SearchOutlined, DownloadOutlined, UploadOutlined, SettingOutlined } from '@ant-design/icons';
import ObjectTable, { IObjectRow } from 'features/Object/components/ObjectTable';
import { range } from 'lodash';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { useHistory } from 'react-router';
import ModalCreateFolder from 'features/Object/components/ModalCreateFolder';
import objectApi from 'api/objectApi';

const dummyData = range(0, 30, 1).map((index: number) => ({
  id: index,
  name: `Object name ${index}`,
  folder: `Folder ${index}`,
  type: `txt`,
  size: `${index} MB`,
  dateModified: '30/04/2021',
}));

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank">Delete bucket</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank">Download bucket</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank">Setting</a>
    </Menu.Item>
  </Menu>
);

function BucketDetail(): JSX.Element {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedObjectKeys, setSelectedObjectKeys] = useState<React.Key[]>([]);
  const [visibleModalCreate, setVisibleModalCreate] = useState<boolean>(false);
  const [createFolderForm] = Form.useForm();
  const inputFileRef: any = useRef(null);

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
  const handleSelect = (selectedRowKeys: React.Key[], selectedRows: IObjectRow[]): void => {
    console.log('🚀 ~ file: index.tsx ~ line 58 ~ handleChangeSelect ~ selectedRows', selectedRows);
    console.log('🚀 ~ file: index.tsx ~ line 58 ~ handleChangeSelect ~ selectedRowKeys', selectedRowKeys);
    setSelectedObjectKeys(selectedRowKeys);
  };

  const handleChange = (
    pagination: TablePaginationConfig,
    filter: Record<string, FilterValue | null>,
    sorter: SorterResult<IObjectRow> | SorterResult<IObjectRow>[],
  ): void => {
    console.log('🚀 ~ file: index.tsx ~ line 72 ~ handleChange ~ pagination', pagination);
    console.log('🚀 ~ file: index.tsx ~ line 72 ~ handleChange ~ sorter', sorter);
  };

  const handleDeleteMulObjects = () => {
    if (!selectedObjectKeys.length) {
      message.warning('Please select at least one object');
      return;
    }
    console.log('Delete: ');
    console.log({ selectedObjectKeys });
    message.info('Delete multi objects');
  };

  const handleViewObject = (objectID: number): void => {
    history.push(`/objects/${objectID}`);
  };

  //Create folder modal
  const toggleModalCreate = () => {
    setVisibleModalCreate(!visibleModalCreate);
  };

  const handleCreateFolder = (): void => {
    message.info('Create new folder');
    toggleModalCreate();
    createFolderForm.resetFields();
  };

  const handleUploadFile = (e: any) => {
    const file = e.target.files[0];
    objectApi.uploadFile(2, file, null).then((res: any) => {
      console.log({ res });
      message.success('Successful uploaded file');
    });
  };

  return (
    <>
      <HeaderPage
        title="Bucket name"
        breadcrumbs={[
          {
            label: 'Back to buckets list',
            path: `/buckets/`,
          },
        ]}
      />
      <div className="bucket-table-container">
        <div className="d-flex justify-content-between">
          <div className="bucket-table-container__search">
            <Input size="large" placeholder="Search..." prefix={<SearchOutlined />} />
          </div>
          <div className="bucket-table-container__actions">
            <Button type="primary" icon={<UploadOutlined />} onClick={() => inputFileRef.current.click()}>
              Upload
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleUploadFile} style={{ display: 'none' }} />
            <Button className="ml-2" type="default" icon={<DownloadOutlined />}>
              Download
            </Button>
            <Button className="ml-2" type="default" onClick={toggleModalCreate}>
              Create folder
            </Button>
            <Button className="ml-2" type="primary" danger onClick={handleDeleteMulObjects}>
              Delete
            </Button>
            <Dropdown overlay={menu} placement="bottomCenter" arrow>
              <Button className="ml-2" type="text" size="large" icon={<SettingOutlined />} />
            </Dropdown>
          </div>
        </div>
        <div className="mt-4">
          <ObjectTable
            loading={loading}
            data={dummyData}
            onChange={handleChange}
            onSelect={handleSelect}
            onSearch={handleSearch}
            onViewDetail={handleViewObject}
            parentID={1}
          />
        </div>
        <ModalCreateFolder
          visible={visibleModalCreate}
          onCancel={toggleModalCreate}
          onOk={handleCreateFolder}
          loading={loading}
          form={createFolderForm}
        />
      </div>
    </>
  );
}

export default BucketDetail;
