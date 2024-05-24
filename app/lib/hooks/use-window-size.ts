'use client'

import { useState } from "react";

export default function useWindowSize() {
    const [width, setWidth] = useState<number>(window.innerWidth);

    window.addEventListener('resize', () => {
        if(window.innerWidth !== width) {
            setWidth(window.innerWidth);
        }
    })

    return {
        width
    }
}