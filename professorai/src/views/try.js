
import React, { useEffect, useState } from 'react';


const Try = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
   
    setCount(prevCount => prevCount + 1);
    console.log("apple")
  }, []); 

  return (
    <div className="try-container">
      <h1>Count: {count}</h1>  
    </div>
  );
};

export default Try;
