import React from 'react';
import HeaderPage from "../../../../components/HeaderPage";
import {Button, Row, Col, Typography} from "antd";
import {DownloadOutlined, DeleteOutlined} from "@ant-design/icons";

const { Title, Text } = Typography;

function ObjectInfo(): JSX.Element {

  return (
    <>
      <HeaderPage
        title="Object name"
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
            <Button className="ml-2" type="primary" icon={<DeleteOutlined/>} danger>
                        Delete
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Row>
            <Col span={18} push={6}>
              <Text>Khanh Hong</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>Owner</Title>
            </Col>
          </Row>
          <Row>
            <Col span={18} push={6}>
              <Text>01/05/2021 10:28</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>Last modified</Title>
            </Col>
          </Row>
          <Row>
            <Col span={18} push={6}>
              <Text>10MB</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>Size</Title>
            </Col>
          </Row>
          <Row>
            <Col span={18} push={6}>
              <Text>PNG</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>Type</Title>
            </Col>
          </Row>
          <Row>
            <Col span={18} push={6}>
              <Text>https://url</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>URL</Title>
            </Col>
          </Row>
          <Row>
            <Col span={18} push={6}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Text>Khanh Hong's Bucket</Text>
            </Col>
            <Col span={6} pull={18}>
              <Title level={5}>Bucket</Title>
            </Col>
          </Row>
          <Row>
            <Col span={18} push={6}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Text>Khanh Hong's Folder</Text>
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
