
import React from 'react';
import { SlidePoint } from '../types';
import Icon from './Icon';

interface SlideItemProps {
    point: SlidePoint;
    index: number;
}

const colorSchemes = [
    { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', iconColor: 'text-green-500' },
    { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', iconColor: 'text-blue-500' },
    { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-300', iconColor: 'text-pink-500' },
    { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', iconColor: 'text-yellow-500' },
    { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', iconColor: 'text-purple-500' },
    { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-300', iconColor: 'text-cyan-500' },
];

const SlideItem: React.FC<SlideItemProps> = ({ point, index }) => {
    const scheme = colorSchemes[index % colorSchemes.length];
    const isReversed = index % 2 !== 0;

    const flexDirection = isReversed ? 'md:flex-row-reverse' : 'md:flex-row';

    return (
        <div className={`flex flex-col ${flexDirection} items-center gap-8 w-full`}>
            <div className={`flex-shrink-0 ${scheme.iconColor}`}>
                <Icon name={point.icon} className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <div className="relative flex-grow w-full md:w-auto">
                <div
                    className={`absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-bold text-sm ${scheme.bg} ${scheme.text} border-2 ${scheme.border} whitespace-nowrap`}
                >
                    {`0${index + 1}. ${point.title}`}
                </div>
                <div className="bg-white border-2 border-gray-900 rounded-2xl p-6 pt-10 text-gray-700 w-full">
                    <p>{point.description}</p>
                </div>
            </div>
        </div>
    );
};

export default SlideItem;
