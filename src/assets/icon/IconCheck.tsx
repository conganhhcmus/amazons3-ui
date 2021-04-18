import React from 'react';

interface IProps {
	fill?: string,
}

const IconCheck = (props: IProps) => {
	const { fill = "#D4E1F4" } = props;

	return (
		<svg
			width="20px"
			height="20px"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			xlinkHref="http://www.w3.org/1999/xlink"
		>
			<g clipPath="url(#clip0)">
				<path d="M10 0.000284923C15.5228 0.000284923 20 4.47744 20 10.0003C20 15.5231 15.5228 20.0002 10 20.0002C4.4772 20.0002 4.14786e-05 15.5231 4.14786e-05 10.0003C-0.0156734 4.4931 4.43598 0.0159998 9.94308 0.000284923C9.96206 0.000230546 9.98104 0.000230546 10 0.000284923Z" fill="#00C2FF" />
				<path d="M15.5395 7.24434L8.43723 14.3466L4.45996 10.3977L6.0793 8.80685L8.43723 11.1364L13.9202 5.65344L15.5395 7.24434Z" fill={fill} />
			</g>
			<defs>
				<clipPath id="clip0">
					<rect width="20" height="20" fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
};

export default IconCheck;