import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Header = (props) => {
  const { componentdata, checktheme, reloadApp } = props;
  const navigate = useNavigate();
  const [isArrowVisible, setIsArrowVisible] = useState(true);
  const [timer, setTimer] = useState(60);

  const handleSelectChange = (event) => {
    const selectedRoute = event.target.value;
    if (selectedRoute) {
      navigate(selectedRoute.replace('/', '-'));
    }
  };

  const toggleArrowVisibility = () => {
    setIsArrowVisible(!isArrowVisible);
    checktheme(isArrowVisible);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          reloadApp(); // Call the reload function passed from App
          return 60; // Reset timer to 60 seconds
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [reloadApp]);

  return (
    <nav>
      <img className="logoPic" alt='logo' src='HODLINFO.8f78fc06.png' />
      <div className="selectedBox">
        <div className={isArrowVisible ? "dropDownBox" : "dropDownBox lightThemedropbox"}>
          <select className={isArrowVisible ? 'show-arrow' : 'hide-arrow lightThemedropbox'}>
            <option>INR</option>
          </select>
        </div>
        <div className={isArrowVisible ? "dropDownBox" : "dropDownBox lightThemedropbox"}>
          <select
            className={isArrowVisible ? 'show-arrow' : 'hide-arrow lightThemedropbox'}
            onChange={handleSelectChange}
          >
            {componentdata.map((ele, index) => {
              const { name } = ele;
              return (
                <option key={index} value={name}>
                  {name.split('/')[0]}
                </option>
              );
            })}
          </select>
        </div>
        <div className={isArrowVisible ? "dropDownBox" : "dropDownBox lightThemedropbox"}>
          <p>Buy Btc</p>
        </div>
      </div>
      <div className="box2">
        <div className='BoxSub2'>
          <div className='timerBox'>
            <p className='timerText'>{timer}</p>
          </div>
          <div className='telBox2'>
            <img className="timg2" alt='telegramlogo' src='telegramLogo.png'/>
            <p>Connect Telegram</p>
          </div>
        </div>
        <label className="switch">
          <input type="checkbox" onChange={toggleArrowVisibility} checked={isArrowVisible} />
          <span className="slider round"></span>
        </label>
        <div></div>
      </div>
    </nav>
  );
};

export default Header;
