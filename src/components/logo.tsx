import React from 'react';
import Image from 'next/image';
import logo from '../../public/ByteSizeLogo.svg';

interface LogoProps {
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({
    alt = 'Logo',
    width = 50,
    height = 50,
    className,
}) => {
    return (
        <div className={className}>
            <Image
                src={logo}
                alt={alt}
                width={width}
                height={height}
                priority
                className="object-contain"
            />
        </div>
    );
};

export default Logo;