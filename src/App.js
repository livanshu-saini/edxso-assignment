import React, { useState, useEffect } from 'react';

const App = () => {
  const [boxColors, setBoxColors] = useState(Array(9).fill('#FFFFFF'));
  const [clickOrder, setClickOrder] = useState([]);
  const [orangeIndex, setOrangeIndex] = useState(0);

  useEffect(() => {
    if (clickOrder.length === 9) {
      if (orangeIndex < clickOrder.length) {
        const timer = setTimeout(() => {
          const newColors = [...boxColors];
          newColors[clickOrder[orangeIndex]] = '#FFA500';
          setBoxColors(newColors);
          setOrangeIndex(prev => prev + 1);
        }, 500); 

        return () => clearTimeout(timer);
      }
    }
  }, [clickOrder, orangeIndex, boxColors]);

  const handleBoxClick = (index) => {
    const newColors = [...boxColors];
    const newClickOrder = [...clickOrder];

    if (newColors[index] === '#FFFFFF') {
      newColors[index] = '#00FF00';
      newClickOrder.push(index);
    }

    if (newClickOrder.length === 9) {
      setOrangeIndex(0);
    }


    setBoxColors(newColors);
    setClickOrder(newClickOrder);
  };

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f0f0f0'
    }}>
      <div style={{
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '16px'
      }}>
        {boxColors.map((color, index) => (
          <div
            key={index}
            onClick={() => handleBoxClick(index)}
            style={{
              width: '100px', 
              height: '100px', 
              backgroundColor: color,
              border: '2px solid #333',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;