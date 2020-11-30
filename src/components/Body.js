import React from 'react'
import motion from 'framer-motion';

export default function Body() {
    return (
        <g className="hangmanSVG">
            <circle cx="35.83" cy="12.5" r="12" className="head"></circle>
            <path d="M32.34 24.62L32.34 70.62" className="body"></path>
            <path d="M32.34 28.62L0.34 58.62" className="left_arm"></path>
            <path d="M32.34 28.62L64.34 58.62" className="right_arm"></path>
            <path d="M32.34 70.62L54.34 115.62" className="right_leg"></path>
            <path d="M32.34 70.62L10.34 115.62" className="left_leg"></path>
        </g>
    );

};
