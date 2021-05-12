import { Button, Form, FormInstance, Input, Modal } from 'antd';
import React from 'react';

interface IModalCreateFolder {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  loading: boolean;
  form: FormInstance;
}

interface ICreateFolderForm {
  name: string;
}

const initialValues: ICreateFolderForm = {
  name: '',
};

function ModalCreateFolder(props: IModalCreateFolder): JSX.Element {
  const { visible, onOk, onCancel, loading, form } = props;

  return (
    <Modal
      className="modal-create-bucket"
      visible={visible}
      title="New Folder"
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
        <Form.Item label="Folder name" name="name" rules={[{ required: true, message: 'Please input folder name' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalCreateFolder;
