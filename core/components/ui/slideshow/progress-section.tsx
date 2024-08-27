import clsx from 'clsx';

import ProgressBar from './progress-bar';

import { Slide } from '.';

interface Props {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  slides: Slide[];
  className?: string;
}

export const ProgressSection = function ProgressSection({
  currentIndex,
  slides,
  setCurrentIndex,
  className = '',
}: Props) {
  return (
    <div className={clsx('flex w-full items-end justify-between gap-4 text-background', className)}>
      <ProgressBar
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        totalItems={slides.length}
      />
      {/* Carousel Count - "01/03" */}
      <span className="font-mono">
        {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1}/
        {slides.length < 10 ? `0${slides.length}` : slides.length}
      </span>
    </div>
  );
};

export default ProgressSection;
