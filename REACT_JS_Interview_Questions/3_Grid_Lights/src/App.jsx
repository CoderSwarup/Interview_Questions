import { useState } from "react";

import "./App.css";

function Cell({ filled, onClick, isDisabled, lable }) {
  return (
    <button
      className={filled ? "cell cell__activetd" : "cell"}
      aria-label={lable}
      onClick={onClick}
      disabled={isDisabled}
    ></button>
  );
}

function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactiving] = useState(false);

  const Config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const deactivateCell = () => {
    setIsDeactiving(true);
    const Timer = setInterval(() => {
      setOrder((orgorder) => {
        const newOrder = orgorder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(Timer);
          setIsDeactiving(false);
        }

        return newOrder;
      });
    }, 300);
  };

  // console.log(Config.flat(1));
  const activateCells = (i) => {
    let newOrder = [...order];
    // Toggle the presence of the cell index in the newOrder array
    if (newOrder.includes(i)) {
      newOrder.splice(newOrder.indexOf(i), 1);
    } else {
      newOrder.push(i);
    }
    setOrder(newOrder);
    if (newOrder.length === Config.flat(1).filter((i) => i === 1).length) {
      deactivateCell();
    }
  };
  return (
    <>
      <h1>Grid Lights</h1>
      <div
        className="wrapper"
        style={{ gridTemplateColumns: `repeat(${Config[0].length},1fr)` }}
      >
        {
          // eslint-disable-next-line react/no-array-index-key
          Config.flat(1).map((value, i) => {
            return value ? (
              <Cell
                key={i}
                lable={`Cell ${i}`}
                filled={order.includes(i)}
                onClick={() => activateCells(i)}
                isDisabled={isDeactivating}
              />
            ) : (
              <span key={i}></span>
            );
          })
        }
      </div>
    </>
  );
}

export default App;
