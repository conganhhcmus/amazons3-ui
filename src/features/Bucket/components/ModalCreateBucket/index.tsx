import { Button, Form, FormInstance, Input, Modal } from 'antd';
import React from 'react';
import 'features/Bucket/components/ModalCreateBucket/styles.scss';
import { CountryDropdown } from 'react-country-region-selector';

interface IModalCreateBucket {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  loading: boolean;
  form: FormInstance;
}

interface ICreateBucketForm {
  name: string;
  region: string;
}

const initialValues: ICreateBucketForm = {
  name: '',
  region: '',
};

function ModalCreateBucket(props: IModalCreateBucket): JSX.Element {
  const { visible, onOk, onCancel, loading, form } = props;

  return (
    <Modal
      className="modal-create-bucket"
      visible={visible}
      title="New Bucket"
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={form.submit}>
          Create
        </Button>,
      ]}
    >
      <Form form={form} initialValues={initialValues} labelCol={{ span: 6 }} onFinish={onOk}>
        <Form.Item label="Bucket name" name="name" rules={[{ required: true, message: 'Please input bucket name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Region" name="region" rules={[{ required: true, message: 'Please choose region' }]}>
          <CountryDropdown
            id="region-dropdown"
            value={form.getFieldValue('region')}
            onChange={(region) => form.setFieldsValue({ region })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalCreateBucket;
