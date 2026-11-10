import React, { useRef, useState } from 'react';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  onClick?: () => void;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  maxTilt = 7,
  scale = 1.02,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = -((y - centerY) / centerY) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 relative select-none ${className}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="w-full h-full transition-transform duration-200 ease-out preserve-3d"
        style={{
          transform: isHovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
        }}
      >
        {children}

        {/* Glare Sheen Effect */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] opacity-25 mix-blend-overlay transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 350px at ${glarePosition.x}% ${glarePosition.y}%, rgba(223, 190, 118, 0.45), transparent 80%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};
