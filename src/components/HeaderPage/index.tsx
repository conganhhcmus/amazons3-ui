import { Breadcrumb } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import 'components/HeaderPage/styles.scss';

interface IBreadcrumb {
  label: string;
  path: string;
  state?: any;
}

interface IHeaderPage {
  title: string;
  breadcrumbs: IBreadcrumb[];
}

function HeaderPage(props: IHeaderPage): JSX.Element {
  const { title = '', breadcrumbs = [] } = props;

  return (
    <div>
      <h1 className="header">{title}</h1>
      <Breadcrumb>
        {breadcrumbs?.map((breadcrumbs: IBreadcrumb, index: number) => (
          <Breadcrumb.Item key={index}>
            <Link to ={{
              pathname: `${breadcrumbs?.path}`,
              state: breadcrumbs?.state,
            }} >{breadcrumbs?.label}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default HeaderPage;
