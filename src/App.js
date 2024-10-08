import { useState, useEffect, useRef, useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import shuffle from 'lodash/shuffle';
import Confetti from 'react-confetti';

import data from './data';
import '././App.css';
import HeadingImage from './images/heading.svg';
import Play from './images/play.svg';
import Reshuffle from './images/reshuffle.svg';
import Replay from './images/replay.svg';
import ExcelConverter from './ExcelConverter'
import { ArrayContext } from './ArrayContext';

function App() {
  const { array, setArray } = useContext(ArrayContext);
  const [names, setNames] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [windowHeight, setWindowHeight] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [wraffling, setWraffling] = useState(false);
  const confettiWrapper = useRef(null);
  const height = 60;

  useEffect(() => {
    setNames(array);
  }, [array])

  const transitions = useTransition(
    names.map((data, i) => ({ ...data, y: 0.5 * i })),
    (d) => d.Name,
    {
      from: { position: 'initial', opacity: 0 },
      leave: {
        height: height - (height * 0.2),
        opacity: 0,
      },
      enter: ({ y }) => ({ y, opacity: 1 }),
      update: ({ y }) => ({ y }),
    }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function startRaffle() {
    if (names.length <= 1) {
      setWraffling(true);
      setShowConfetti(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * names.length);
    const filterOutNames = names.filter((name) => name !== names[randomIndex]);
    setNames(filterOutNames);
    setInitialLoad(true);
  }

  function restartRaffle() {
    setInitialLoad(false);
    setNames(data);
    setWraffling(false);
    setShowConfetti(false);
  }

  useEffect(() => {
    if (initialLoad) {
      const filteringTimer = setTimeout(() => {
        startRaffle();
      }, 700);
      return () => {
        clearTimeout(filteringTimer);
      };
    }
  }, [initialLoad, names, startRaffle]);

  useEffect(() => {
    setWindowHeight(confettiWrapper.current.clientHeight);
    setWindowWidth(confettiWrapper.current.clientWidth);
  }, []);

  return (
    <div className="container" ref={confettiWrapper}>
      <div className="raffle-header">
        {/* <img className="banner-image" src={HeadingImage} alt="heading logo" /> */}
        <img src={'/logo-horizontal.png'} style={{
          width: "350px",
          display: "inline-block",
          margin: "0 0 0.5rem 0"
        }} alt="heading logo" />
        <h3 className='test1' style={{
          display: "inline-block"
        }}>
          {/* <div className='Brand'>CloudMyDc's</div>  */}
          Raffle Giveaway</h3>
        {array.length !== 0 && <>{!initialLoad && (
          <div className="raffle-header__buttons">
            <button className="button-primary" onClick={startRaffle}>
              <img src={Play} alt="heading logo" />
              Start Raffle
            </button>
            <button
              className="button-outline"
              onClick={() => setNames(shuffle(names))}
            >
              <img src={Reshuffle} alt="heading logo" />
              Shuffle
            </button>
          </div>
        )}</>}
      </div>
      {array.length !== 0 && <>{wraffling && (
        <Confetti
          recycle={showConfetti}
          numberOfPieces={80}
          width={windowWidth}
          height={windowHeight}
        />
      )}
        <div className="raffle-names">
          {transitions.map(({ item, props: { y, ...rest }, index }) => (
            <animated.div
              className="raffle-listnames"
              key={index}
              style={{
                transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
                ...rest
              }}
            >
              <div className="raffle-namelist">
                <span>{item.Name}</span>
              </div>
            </animated.div>
          ))}
        </div>
        <div>
          {showConfetti && (
            <div className="raffle-ends">
              <h3 style={{
                margin: "0.5rem 0 2rem 0"
              }}>Congratulations! You have won the raffle!</h3>
              <button className="button-outline" onClick={restartRaffle}>
                <img src={Replay} alt="heading logo" />
                Replay
              </button>
            </div>
          )}
        </div></>}

      {array.length === 0 &&
        <ExcelConverter />}
    </div>
  );
}

export default App;
