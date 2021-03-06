import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import HeaderPage from 'components/HeaderPage';
import { Button, Input, message, TablePaginationConfig, Dropdown, Menu, Form } from 'antd';
import { SearchOutlined, DownloadOutlined, UploadOutlined, SettingOutlined } from '@ant-design/icons';
import ObjectTable, { IObjectRow } from 'features/Object/components/ObjectTable';
import { reverse } from 'lodash';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { useHistory, useLocation } from 'react-router';
import ModalCreateFolder from 'features/Object/components/ModalCreateFolder';
import { useParams } from 'react-router-dom';
import objectApi from '../../../../api/objectApi';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';

const normalizeObjectResponse = (data: any) => {
  const newData = reverse(
    data.map((item: any) => ({
      id: item?.id?.toString(),
      name: item?.name,
      folder: item?.folder,
      type: item?.type,
      size: item?.size,
      dateModified: item?.last_update ? item?.last_update : moment(Date.now()).format('DD/MM/YYYY'),
    })),
  );
  return newData;
};

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

interface IState {
  parent:{
    id?: string;
    name?: string;
    level?: number;
  };
  bucket: {
    id?: string;
    name?: string;
  }
  goBackPath?: string;
  child: {
    id?: string;
    name?: string;
  }
}

function FolderDetail(): JSX.Element {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedObjectKeys, setSelectedObjectKeys] = useState<React.Key[]>([]);
  const [visibleModalCreate, setVisibleModalCreate] = useState<boolean>(false);
  const [createFolderForm] = Form.useForm();
  const inputFileRef: any = useRef(null);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const useLocationState: IState = (location.state as IState);

  const [objectsList, setObjectsList] = useState<IObjectRow[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id, parent } = useParams();
  //Search
  let timeout: NodeJS.Timeout;

  useEffect(() => {
    setTimeout(() => {
      objectApi.getObjectsInFolder(id, parent).then((res: any) => {
        if (res.data != null) {
          const normalizeData = normalizeObjectResponse(res.data);
          setObjectsList(normalizeData);
        }
        setLoading(false);
      });
    }, 1000);
  }, [objectsList]);

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
    console.log('???? ~ file: index.tsx ~ line 58 ~ handleChangeSelect ~ selectedRows', selectedRows);
    console.log('???? ~ file: index.tsx ~ line 58 ~ handleChangeSelect ~ selectedRowKeys', selectedRowKeys);
    setSelectedObjectKeys(selectedRowKeys);
  };

  const handleChange = (
    pagination: TablePaginationConfig,
    filter: Record<string, FilterValue | null>,
    sorter: SorterResult<IObjectRow> | SorterResult<IObjectRow>[],
  ): void => {
    console.log('???? ~ file: index.tsx ~ line 72 ~ handleChange ~ pagination', pagination);
    console.log('???? ~ file: index.tsx ~ line 72 ~ handleChange ~ sorter', sorter);
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

  const handleViewObject = (parentId: any, objectID: number, name: string): void => {
    const selectedObject = objectsList.find(object => object.id == objectID);
    if (selectedObject?.type == "file") {
      history.push({
        pathname: `/objects/${objectID}`,
        state: {
          bucket: {
            id: useLocationState.bucket.id,
            name: useLocationState.bucket.name
          },
          parent: {
            id: parentId,
            name: useLocationState.child.name,
            level: 1
          },
          goBackPath: location.pathname,
          child: {
            id: selectedObject.name,
            name: selectedObject.id,
          }
        }
      });
    } else if (selectedObject?.type == "folder") {
      history.push({
        pathname: `/buckets/${id}/folder/${objectID}`,
        state: {
          parent: {
            id: parentId,
            name: useLocationState.child.name,
            level: 1
          },
          bucket: {
            id: useLocationState.bucket.id,
            name: useLocationState.bucket.name
          },
          goBackPath: location.pathname,
          child: {
            name: name,
            id: objectID
          }
        }
      });
    }
  };

  //Create folder modal
  const toggleModalCreate = () => {
    setVisibleModalCreate(!visibleModalCreate);
  };

  const handleCreateFolder = (): void => {
    const folderName = createFolderForm.getFieldValue('name');
    objectApi.addFolder(folderName, id, parent, userInfo).then((res: any) => {
      console.log(res);
      if (res.data) {
        toggleModalCreate();
        message.info('Create new folder');
        createFolderForm.resetFields();
        setObjectsList([res.data]);
      }
    });
  };

  const handleUploadFile = (e: any) => {
    const file = e.target.files[0];
    objectApi.uploadFile(id, file, parent, userInfo.userId).then((res: any) => {
      console.log({ res });
      setObjectsList([res]);
      message.success('Successful uploaded file');
    });
  };

  return (
    <>
      <HeaderPage
        title={useLocationState.child.name ? useLocationState.child.name : "Folder name"}
        breadcrumbs={[
          {
            label: 'Buckets',
            path: `/buckets/${useLocationState.parent.id}`,
          },
          {
            label: `${useLocationState.bucket.name}`,
            path: `/buckets/${useLocationState.bucket.id}`,
            state: { bucketName: useLocationState.bucket.name }
          },
          {
            label: `${useLocationState.child.name}`,
            path: `/buckets/${useLocationState.parent.id}/folder/${useLocationState.child.id}`,
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
            <Button className="ml-2" type="default" hidden={true} onClick={toggleModalCreate}>
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
            data={objectsList}
            onChange={handleChange}
            onSelect={handleSelect}
            onSearch={handleSearch}
            onViewDetail={handleViewObject}
            parentID={parent}
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

export default FolderDetail;
