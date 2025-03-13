import React from 'react';
import TextPressure from '../components/TextPressure';

function HomePage() {
  return (
    <div style={{ position: 'relative', height: '300px' }}>
      <TextPressure
        text="StudyPy"
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={true}
        textColor="#000000" // Adjust color as needed
        strokeColor="#ff0000"
        minFontSize={36}
      />
    </div>
  );
}

export default HomePage; 