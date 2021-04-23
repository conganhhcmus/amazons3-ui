import React from 'react';

interface IProps {
  fill?: string;
}

const IconArrowDown = (props: IProps): JSX.Element => {
  const { fill = 'white' } = props;

  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 1L5 4.5L1.5 1" stroke={fill} strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
};

export default IconArrowDown;
