import { Menu } from 'antd';
import { RootState } from 'app/store';
import IconBucket from 'assets/icon/IconBucket';
import IconUsers from 'assets/icon/IconUsers';
import 'components/Layout/Sidebar/styles.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

interface ISidebar {
  selectedKey: string;
  onSelectKey: (selectedKeys: { selectedKeys?: React.Key[] }) => void;
}

function Sidebar(props: ISidebar): JSX.Element {
  const { selectedKey, onSelectKey } = props;
  const history = useHistory();
  const isRoot = useSelector((state: RootState) => (state.user.userInfo)?(state.user.userInfo.userName):null)
  return (
    <>
      <div className="logo" />
      <Menu
        className="sidebar-menu"
        mode="inline"
        defaultSelectedKeys={['1']}
        selectedKeys={[selectedKey]}
        onSelect={onSelectKey}
      >
        <Menu.Item
          key="1"
          icon={
            <span>
              <IconBucket />
            </span>
          }
          onClick={() => history.push('/buckets')}
        >
          Bucket
        </Menu.Item>
        {isRoot&&<Menu.Item
          key="2"
          icon={
            <span>
              <IconUsers />
            </span>
          }
          onClick={() => history.push('/users')}
        >
          User
        </Menu.Item>}
      </Menu>
    </>
  );
}

export default Sidebar;
