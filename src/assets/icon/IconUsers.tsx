import React from 'react';

interface IProps {
  fill?: string;
}

const IconUsers = (props: IProps): JSX.Element => {
  const { fill = '#8A9097' } = props;

  return (
    <svg
      width="14px"
      height="14px"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M24.3214 14.6584C27.396 11.8944 27.6478 7.16117 24.8837 4.08653C22.3486 1.26657 18.1053 0.78751 15.0053 2.97133C11.626 0.586367 6.9531 1.39251 4.56814 4.77182C2.37974 7.87264 2.85686 12.1203 5.67863 14.6584C2.17251 16.5066 -0.0157666 20.1503 0.000116398 24.1137V27.3279C0.000116398 27.9197 0.479808 28.3994 1.07156 28.3994H28.9285C29.5203 28.3994 29.9999 27.9197 29.9999 27.3279V24.1137C30.0158 20.1503 27.8275 16.5066 24.3214 14.6584ZM19.2856 3.75669C22.2401 3.75342 24.6379 6.14585 24.6412 9.10034C24.6436 11.2074 23.4088 13.1196 21.4874 13.9845C21.4049 14.0219 21.3224 14.0562 21.2389 14.0916C20.9745 14.1983 20.7017 14.2832 20.4235 14.3456C20.37 14.3574 20.3163 14.3638 20.2617 14.3745C19.9508 14.4341 19.6354 14.466 19.3189 14.4699C19.1763 14.4699 19.0328 14.4591 18.8903 14.4463C18.8367 14.4463 18.7831 14.4463 18.7296 14.4356C18.1206 14.3639 17.5282 14.1893 16.9778 13.9192C16.9574 13.9095 16.9338 13.9106 16.9135 13.902C16.8063 13.8506 16.6992 13.8056 16.6039 13.7477C16.6125 13.737 16.6178 13.7252 16.6263 13.7145C17.1176 13.0832 17.505 12.3776 17.7738 11.6242L17.807 11.5341C17.9293 11.1743 18.0242 10.8058 18.091 10.4316C18.1006 10.377 18.1081 10.3245 18.1167 10.2656C18.1787 9.8847 18.2113 9.49968 18.2142 9.11377C18.2111 8.72863 18.1785 8.3443 18.1167 7.96411C18.1081 7.90843 18.1006 7.85695 18.091 7.79806C18.0242 7.42396 17.9293 7.05539 17.807 6.69554L17.7738 6.60552C17.505 5.85211 17.1176 5.14648 16.6263 4.51518C16.6177 4.50444 16.6124 4.4927 16.6039 4.48197C17.4179 4.00711 18.3433 3.75675 19.2856 3.75669ZM5.3572 9.11384C5.34961 6.16287 7.73564 3.76447 10.6866 3.75688C12.0699 3.7533 13.4007 4.28635 14.399 5.24385C14.4611 5.30387 14.5222 5.36382 14.5821 5.42597C14.7662 5.61876 14.9358 5.82468 15.09 6.04202C15.1372 6.10844 15.18 6.17919 15.2239 6.24774C15.3737 6.4782 15.5051 6.72003 15.6171 6.97095C15.6439 7.03204 15.6643 7.09419 15.6878 7.15521C15.8007 7.43275 15.8896 7.71952 15.9535 8.01232C15.9611 8.04447 15.9632 8.07661 15.9696 8.10982C16.1053 8.77508 16.1053 9.46094 15.9696 10.1262C15.9632 10.1594 15.961 10.1916 15.9535 10.2237C15.8897 10.5165 15.8008 10.8033 15.6878 11.0808C15.6643 11.1419 15.6439 11.2041 15.6171 11.2651C15.505 11.5156 15.3735 11.7571 15.2239 11.9872C15.18 12.0558 15.1372 12.1265 15.09 12.1929C14.9359 12.4103 14.7662 12.6162 14.5821 12.809C14.5221 12.8711 14.461 12.9312 14.399 12.9911C13.9652 13.4045 13.465 13.7421 12.9193 13.9897C12.8326 14.0293 12.7447 14.0658 12.6558 14.0968C12.3975 14.1993 12.1318 14.2817 11.8608 14.3432C11.7933 14.3582 11.7236 14.3668 11.6551 14.3786C11.3642 14.4328 11.0692 14.4625 10.7733 14.4675H10.6555C10.3596 14.4625 10.0646 14.4328 9.77368 14.3786C9.70513 14.3668 9.63544 14.3582 9.56796 14.3432C9.297 14.2817 9.0312 14.1993 8.77299 14.0968C8.68403 14.0615 8.5962 14.0251 8.50945 13.9897C6.59256 13.1242 5.35965 11.217 5.3572 9.11384ZM19.2856 26.2565H2.14294V24.1137C2.12724 20.483 4.41477 17.2415 7.84073 16.0395C9.67989 16.8052 11.7486 16.8052 13.5879 16.0395C13.9456 16.1702 14.2942 16.3245 14.6314 16.5013C14.8543 16.6159 15.06 16.7466 15.2743 16.8784C15.4136 16.9652 15.555 17.0499 15.6889 17.1452C15.8957 17.292 16.0907 17.4517 16.2825 17.6156C16.4057 17.7227 16.5278 17.8298 16.6435 17.937C16.8203 18.1041 16.9864 18.2809 17.146 18.462C17.2607 18.5927 17.3721 18.7256 17.4782 18.8627C17.6186 19.0427 17.7525 19.227 17.8768 19.4166C17.9839 19.5773 18.0793 19.7445 18.1735 19.9116C18.2807 20.0959 18.3792 20.2802 18.4692 20.472C18.5592 20.6638 18.6385 20.8738 18.7156 21.0784C18.7831 21.2563 18.8549 21.4331 18.9106 21.6141C18.9856 21.8627 19.0381 22.1198 19.0906 22.3769C19.1227 22.5291 19.1645 22.678 19.1881 22.8323C19.2516 23.2565 19.2841 23.6848 19.2856 24.1137V26.2565H19.2856ZM27.8571 26.2565H21.4285V24.1137C21.4285 23.7784 21.4093 23.4462 21.3792 23.1173C21.3706 23.0209 21.3557 22.9255 21.345 22.8291C21.316 22.5923 21.2828 22.3577 21.2378 22.1251C21.2185 22.0259 21.1982 21.9262 21.1767 21.8262C21.1253 21.5876 21.0657 21.3512 20.9978 21.1169C20.9753 21.0398 20.9549 20.9615 20.9314 20.8855C20.6314 19.9265 20.1966 19.0149 19.6403 18.1781L19.5985 18.117C19.4143 17.8434 19.2175 17.5788 19.0082 17.3231L19.0007 17.3134C18.7864 17.0477 18.5539 16.7895 18.3096 16.5452C18.3236 16.5452 18.3386 16.5452 18.3536 16.5452C18.6559 16.5849 18.9604 16.6064 19.2654 16.6095H19.3243C19.6066 16.607 19.8884 16.5888 20.1686 16.5549C20.2565 16.5441 20.3433 16.5281 20.4311 16.5141C20.659 16.4791 20.884 16.4338 21.1061 16.3781C21.1693 16.362 21.2336 16.347 21.2979 16.3288C21.5894 16.2495 21.8756 16.1521 22.155 16.0374C25.5835 17.2381 27.8731 20.4812 27.8571 24.1138V26.2565H27.8571Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconUsers;
