import React, { useState } from 'react';

const TextInputControl = ({ label, value, setText, id }) => {
  const [current, setCurrent] = useState(value);
  const [identifier, setId] = useState(id);
  if (id !== identifier) {
    setCurrent(value);
    setId(id);    
  }
  const handleChange = (event) => {
    const current = event.target.value;
    setCurrent(current);
    setText(current);
  };

  return (
    <div className="text-input-control">
      <div className="text-input-label">{label}</div>
      <input type="text" name={label} value={current} onChange={handleChange} />
    </div>
  );
}

export default TextInputControl;
