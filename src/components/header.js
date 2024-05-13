import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import homepage from '../data/logo.png';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const safetyDropdownRef = useRef(null);
  const aussieSlangDropdownRef = useRef(null);
  const [isSafetyDropdownOpen, setSafetyDropdownOpen] = useState(false);
  const [isAussieSlangDropdownOpen, setAussieSlangDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const defaultStyle = { backgroundColor: 'rgba(0, 123, 255, 0.5)' };
  const buttonStyle = { fontFamily: '"Bebas Neue", sans-serif' };

  // Toggle dropdown on click, and close on click outside
  const handleClick = (event, ref, isOpen, setOpen) => {
    if (!ref.current.contains(event.target)) {
      setOpen(false);
    } else {
      setOpen(!isOpen);
    }
  };

  // Use useEffect to add an event listener to the document
  React.useEffect(() => {
    const handleDocumentClick = (event) => {
      if (safetyDropdownRef.current && !safetyDropdownRef.current.contains(event.target)) {
        setSafetyDropdownOpen(false);
      }
      if (aussieSlangDropdownRef.current && !aussieSlangDropdownRef.current.contains(event.target)) {
        setAussieSlangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <div className='flex flex-col md:flex-row items-center justify-between p-4 shadow-lg w-full' style={defaultStyle}>
      <img
        src={homepage}
        alt='Logo'
        className='object-contain h-16 w-17 mb-4 md:mb-0 cursor-pointer'
        onClick={() => navigate('/home')}
      />
      <div className='flex flex-col md:flex-row justify-center items-center'>

        {['/home', '/events', '/restaurant', '/slang-learning'].map(path => (
          <button

            key={path}
            className={`text-white px-3 py-2 rounded-md text-xl font-medium m-2 transition-colors duration-200 ${isActive(path) ? 'bg-blue-700' : 'bg-transparent hover:bg-blue-700'}`}
            style={buttonStyle}
            onClick={() => navigate(path)}>
            {path.substring(1)}
          </button>
        ))}
        <div className='relative' ref={safetyDropdownRef}>
          <button
            className='text-white px-3 py-2 rounded-md text-xl font-medium m-2 transition-colors duration-200 hover:bg-blue-700 flex items-center'
            style={buttonStyle}
            onClick={(e) => handleClick(e, safetyDropdownRef, isSafetyDropdownOpen, setSafetyDropdownOpen)}
          >
            Safety <span className='ml-2 text-xs'>▼</span>
          </button>
          {isSafetyDropdownOpen && (
            <div className='absolute left-0 mt-2 w-36 bg-white shadow-lg rounded-md z-50'>
              {['/road-safety', '/beach-safety'].map(path => (
                <button
                  key={path}
                  className='text-black block px-4 py-2 text-sm w-full text-left hover:bg-blue-300'
                  onClick={() => navigate(path)}>
                  {path.split('/').pop().replace('-', ' ')}
                </button>
              ))}
              <div className='my-1 border-b border-gray-300'></div>
              <button
                className='text-black block px-4 py-2 text-sm w-full text-left hover:bg-blue-300'
                onClick={() => navigate('/attribution')}>
                Attribution
              </button>
            </div>
          )}
        </div>
        <div className='relative' ref={aussieSlangDropdownRef}>
          <button
            className='text-white px-3 py-2 rounded-md text-xl font-medium m-2 transition-colors duration-200 hover:bg-blue-700 flex items-center'
            style={buttonStyle}
            onClick={(e) => handleClick(e, aussieSlangDropdownRef, isAussieSlangDropdownOpen, setAussieSlangDropdownOpen)}
          >
            Aussie Slang <span className='ml-2 text-xs'>▼</span>
          </button>
          {isAussieSlangDropdownOpen && (
            <div className='absolute left-0 mt-2 w-36 bg-white shadow-lg rounded-md z-50'>
              <button
                className='text-black block px-4 py-2 text-sm w-full text-left hover:bg-blue-300'
                onClick={() => {
                  navigate('/slang-game');
                }}>
                Slang Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
