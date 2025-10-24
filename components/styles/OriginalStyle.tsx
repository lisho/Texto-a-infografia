
import React from 'react';
import { SlidePoint } from '../../types';
import SlideItem from '../SlideItem';

interface StyleProps {
  points: SlidePoint[];
}

const OriginalStyle: React.FC<StyleProps> = ({ points }) => {
  return (
    <div className="space-y-12 flex flex-col items-center">
      {points.map((point, index) => (
        <SlideItem key={index} point={point} index={index} />
      ))}
    </div>
  );
};

export default OriginalStyle;
