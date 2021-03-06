import { Button, Result } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

function NotFound(): JSX.Element {
  const history = useHistory();

  const handleBack = () => {
    history.push('/');
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleBack}>
            Back Home
          </Button>
        }
      />
    </div>
  );
}

export default NotFound;
