// 'use client';

// import { useEffect, useState } from "react";

// export default function useWindowSize() {
//     const [width, setWidth] = useState<number>(window?.innerWidth || 0);

//     useEffect(() => {
//         if(typeof window !== 'undefined') {
//             window.addEventListener(
//                 'resize',
//                 () => setWidth(window.innerWidth)
//             )
//         }
//     }, []);

//     return { width };
// }