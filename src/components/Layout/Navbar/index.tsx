import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import 'components/Layout/Navbar/styles.scss';
import AvatarCustom from 'components/AvatarCustom';
import { Dropdown, Input, Menu } from 'antd';
import IconArrowDown from 'assets/icon/IconArrowDown';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import ModalProfile from '../ModalProfile';

interface INavbar {
  collapsed: boolean;
  toggle: () => void;
  onLogout: () => void;
}

function Navbar(props: INavbar): JSX.Element {
  const { collapsed, toggle, onLogout } = props;
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [visibleProfile, setVisibleProfile] = useState<boolean>(false);

  const toggleVisibleProfile = () => setVisibleProfile(!visibleProfile);

  const menu = (
    <Menu>
      <Menu.Item onClick={toggleVisibleProfile}>Profile</Menu.Item>
      <Menu.Item onClick={onLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <div className="d-flex">
        {collapsed ? (
          <MenuUnfoldOutlined className="trigger" onClick={toggle} style={{ color: 'white' }} />
        ) : (
          <MenuFoldOutlined className="trigger" onClick={toggle} style={{ color: 'white' }} />
        )}
        <div className="navbar__search ml-3">
          <Input size="large" placeholder="Search..." prefix={<SearchOutlined />} />
        </div>
      </div>
      <Dropdown overlayClassName="navbar__dropdown" overlay={menu} placement="bottomRight" arrow trigger={['click']}>
        <div className="navbar__avatar">
          <AvatarCustom name={userInfo?.userName?.toUpperCase()} />
          <IconArrowDown />
        </div>
      </Dropdown>
      <ModalProfile open={visibleProfile} toggle={toggleVisibleProfile} user={userInfo} />
    </div>
  );
}

export default Navbar;
