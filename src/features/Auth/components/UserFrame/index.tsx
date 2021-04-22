import React from 'react';
import 'features/Auth/components/UserFrame/styles.scss';
import IconCheck from 'assets/icon/IconCheck';

interface IProps {
  title: string;
  icon: JSX.Element;
  className?: string;
  onClick?: () => void;
  highlight: boolean;
}

function UserFrame(props: IProps): JSX.Element {
  const { title, icon, className, onClick, highlight } = props;

  return (
    <div
      className={`d-flex justify-content-center align-items-center flex-column container-user mb-4 mt-1 ${className} ${
        highlight ? 'container-user--highlight' : ''
      }`}
      onClick={onClick}
    >
      <p>{title}</p>
      {icon}
      {highlight && (
        <div className="container-user__icon-check">
          <IconCheck />
        </div>
      )}
    </div>
  );
}

export default UserFrame;
