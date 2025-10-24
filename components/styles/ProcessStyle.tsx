
import React from 'react';
import { SlidePoint } from '../../types';
import Icon from '../Icon';

interface StyleProps {
  points: SlidePoint[];
}

const ProcessStyle: React.FC<StyleProps> = ({ points }) => {
  return (
    <div className="relative pl-8 md:pl-12">
      <div className="absolute top-0 bottom-0 left-4 md:left-6 w-1 border-l-4 border-dashed border-gray-300"></div>
      
      <div className="space-y-12">
        {points.map((point, index) => (
          <div key={index} className="relative flex items-start gap-6">
            <div className="absolute top-1 -left-[1.6rem] md:-left-[2.1rem] z-10 flex items-center justify-center bg-gray-900 w-12 h-12 rounded-full border-4 border-[#f8f8f8]">
                <span className="text-white font-bold">{index + 1}</span>
            </div>
            
            <div className="flex-grow bg-white border-2 border-gray-900 rounded-lg p-5 shadow-lg">
                <div className="flex items-center gap-4">
                    <Icon name={point.icon} className="w-8 h-8 text-gray-700" />
                    <h3 className="font-extrabold text-lg text-gray-900">{point.title}</h3>
                </div>
                <p className="mt-2 text-gray-600 pl-12">{point.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessStyle;
