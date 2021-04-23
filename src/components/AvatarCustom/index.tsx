import { Avatar } from 'antd';
import React from 'react';

interface IAvatarCustom {
  name: string;
}

const AvatarCustom = (props: IAvatarCustom): JSX.Element => {
  const { name = '' } = props;
  return (
    <div>
      <Avatar
        style={{
          backgroundColor: '#C2C0C0',
          verticalAlign: 'middle',
        }}
        size="large"
      >
        {name[0]}
      </Avatar>
    </div>
  );
};

export default AvatarCustom;
