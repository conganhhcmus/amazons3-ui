import React, { useEffect, useState } from 'react';
import HeaderPage from "../../../../components/HeaderPage";
import { Button, Row, Col, Typography, message, Popconfirm } from 'antd';
import {DownloadOutlined, DeleteOutlined} from "@ant-design/icons";
import objectApi from '../../../../api/objectApi';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useHistory } from 'react-router';

const { Title, Text } = Typography;

export interface IObjectInfo{
  id: string;
  bucket_id: string;
  name: string;
  lastModified: string;
  size: string;
  type: string;
  path: string;
}

const normalizeObjectInfoResponse = (data: any) => {
  const newData = {
    id: data?.id?.toString(),
    bucket_id: data?.bucket_id?.toString(),
    name: data?.name,
    path: data?.path,
    type: data?.type,
    size: data?.size,
    lastModified: data?.last_update ? data?.last_update : moment(Date.now()).format('DD/MM/YYYY'),
  }
  return newData;
};

function ObjectInfo(): JSX.Element {
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  const {id} = useParams();
  const [objectData, setObjectData] = useState<IObjectInfo>();

  useEffect(()=>{
    objectApi.getDetailObject(id).then( (res: any) => {
      if (res.data != null){
        const normalizaData = normalizeObjectInfoResponse(res.data);
        setObjectData(normalizaData);
      }
    });
  },[]);

  const deleteObjectHandle = () => {
    objectApi.deleteObject(id).then((res: any) => {
      if (res.message == "success"){
        message.info('Deleted.');
        history.goBack();
      }
    });
  }

  return (
    <>
      <HeaderPage
        title={objectData?.name ? objectData.name : "Object"}
        breadcrumbs={[
          {
            label: 'Back to buckets list',
            path: `/buckets/`,
          },
        ]}
      />
      <div className="bucket-table-container">
        <div className="d-flex justify-content-between">
          <div className="bucket-table-container__actions">
            <Button className="ml-2" type="default" icon={<DownloadOutlined />}>
                        Download
            </Button>
            <Popconfirm className="ml-2" title="Are you sure to delete this object?" onConfirm={deleteObjectHandle} okText="Yes" cancelText="No">
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        </div>
        <div className="mt-4">
          <Row>
            <Col span={18} push={6}>
              <Text>User</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>Owner</Title>
            </Col>
          </Row>
          <Row>
            <Col span={18} push={6}>
              <Text>{objectData?.lastModified}</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>Last modified</Title>
            </Col>
          </Row>
          <Row>
            <Col span={18} push={6}>
              <Text>{objectData?.size} KB</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>Size</Title>
            </Col>
          </Row>
          <Row>
            <Col span={18} push={6}>
              <Text>{objectData?.type}</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>Type</Title>
            </Col>
          </Row>
          <Row>
            <Col span={18} push={6}>
              <Text>{objectData?.path}</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>URL</Title>
            </Col>
          </Row>
          <Row>
            <Col span={18} push={6}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Text>User's Bucket</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>Bucket</Title>
            </Col>
          </Row>
          <Row>
            <Col span={18} push={6}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Text>User's Folder</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>Folder</Title>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default ObjectInfo;
