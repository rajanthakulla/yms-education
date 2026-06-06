import React from 'react';

interface TwoToneHeadingProps {
  firstText: string;
  secondText: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export default function TwoToneHeading({
  firstText,
  secondText,
  as: Component = 'h2',
  className = '',
}: TwoToneHeadingProps) {
  return (
    <Component className={`heading-two-tone font-nunito font-black ${className}`}>
      <span>{firstText}</span> <span>{secondText}</span>
    </Component>
  );
}
