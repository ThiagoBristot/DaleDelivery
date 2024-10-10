import React, { useState, useEffect } from 'react';

const Notification = ({ message, type = 'success', duration = 3000 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);

      return () => clearTimeout(timer); // Limpar o temporizador ao desmontar
    }
  }, [message, duration]);

  return (
    <div className={`notification ${type} ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;
