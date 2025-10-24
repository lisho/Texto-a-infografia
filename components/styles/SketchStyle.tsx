
import React from 'react';
import { SlidePoint } from '../../types';
import Icon from '../Icon';

interface StyleProps {
  points: SlidePoint[];
}

const SketchStyle: React.FC<StyleProps> = ({ points }) => {
  const bgColors = ['bg-yellow-100', 'bg-blue-100', 'bg-green-100', 'bg-pink-100', 'bg-purple-100', 'bg-orange-100'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {points.map((point, index) => (
        <div 
          key={index}
          className={`p-6 border-2 border-black rounded-lg transform -rotate-${index % 2 === 0 ? '1' : '2'} hover:rotate-0 hover:scale-105 transition-transform duration-300 shadow-[4px_4px_0px_#000] ${bgColors[index % bgColors.length]}`}
          style={{ fontFamily: "'Comic Sans MS', 'Chalkduster', 'cursive'" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white p-2 rounded-full border-2 border-black">
                <Icon name={point.icon} className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold text-black">{point.title}</h3>
          </div>
          <p className="text-gray-800">{point.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SketchStyle;
