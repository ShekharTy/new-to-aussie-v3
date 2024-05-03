import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import homepage from '../data/logo.png';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [isSafetyDropdownOpen, setSafetyDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const defaultStyle = { backgroundColor: 'rgba(0, 123, 255, 0.5)' };
  const buttonStyle = { fontFamily: '"Bebas Neue", sans-serif' };

  // To handle mouse enter and leave for both the button and the dropdown
  const toggleDropdown = (state) => {
    if (state) {
      setSafetyDropdownOpen(true);
    } else {
      // Delay closing to allow for clicking on an item
      setTimeout(() => {
        if (!dropdownRef.current.contains(document.activeElement)) {
          setSafetyDropdownOpen(false);
        }
      }, 100);
    }
  };

  return (
    <div className='flex flex-col md:flex-row items-center justify-between p-4 shadow-lg w-full' style={defaultStyle}>
      <img
        src={homepage}
        alt='Logo'
        className='object-contain h-16 w-17 mb-4 md:mb-0 cursor-pointer'
        onClick={() => navigate('/home')}
      />
      <div className='flex flex-col md:flex-row justify-center items-center'>
        {['/home', '/events', '/restaurant','/slang-game'].map(path => (
          <button
            key={path}
            className={`text-white px-3 py-2 rounded-md text-xl font-medium m-2 transition-colors duration-200 ${isActive(path) ? 'bg-blue-700' : 'bg-transparent hover:bg-blue-700'}`}
            style={buttonStyle}
            onClick={() => navigate(path)}>
            {path.substring(1)}
          </button>
        ))}
        <div className='relative' onMouseEnter={() => toggleDropdown(true)} onMouseLeave={() => toggleDropdown(false)} ref={dropdownRef}>
          <button
            className='text-white px-3 py-2 rounded-md text-xl font-medium m-2 transition-colors duration-200 hover:bg-blue-700 flex items-center'
            style={buttonStyle}
          >
            Safety <span className='ml-2 text-xs'>▼</span> {/* Smaller arrow */}
          </button>
          {isSafetyDropdownOpen && (
            <div className='absolute left-0 mt-2 w-36 bg-white shadow-lg rounded-md z-50'> {/* Narrower dropdown */}
              {['/road-safety', '/beach-safety'].map(path => (
                <button
                  key={path}
                  className='text-black block px-4 py-2 text-sm w-full text-left hover:bg-blue-300'
                  onClick={() => {
                    navigate(path);
                    setSafetyDropdownOpen(false);
                  }}>
                  {path.split('/').pop().replace('-', ' ')}
                </button>
              ))}
              <div className='my-1 border-b border-gray-300'></div> {/* Divider */}
              <button
                className='text-black block px-4 py-2 text-sm w-full text-left hover:bg-blue-300'
                onClick={() => {
                  navigate('/attribution');
                  setSafetyDropdownOpen(false);
                }}>
                Attribution
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
