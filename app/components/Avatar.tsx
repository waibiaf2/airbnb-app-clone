'use client'
import React from 'react';

import Image from 'next/image';

const Avatar = () => {
    return (
        <Image
            className="rounded-full"
            src="/images/placeholder.jpg"
            alt="avatar"
            height="30"
            width="30"
        />
    );
};

export default Avatar;