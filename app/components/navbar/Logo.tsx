'use client';

import React from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";

const Logo = () => {
    return (
        <Image
            src="/image/logo.png"
            alt="logo"
            className="hidden md:block cursor-pointer"
        />
    );
};

export default Logo;