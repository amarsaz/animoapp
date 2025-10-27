import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M8 4C6.5 4 5 5.5 5 7s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm8 0c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zM12 11c-4 0-7 2-7 5v3c0 1 1 2 2 2h10c1 0 2-1 2-2v-3c0-3-3-5-7-5z"/>
        </svg>
    );
}
