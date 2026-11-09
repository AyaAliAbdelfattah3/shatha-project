import  { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <img
      src="/assets/c1.png"
      alt="Shatha Cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '35px',
        height: '35px',
        objectFit: 'contain',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        transition: 'transform 0.05s ease-out'
      }}
    />
  );
}