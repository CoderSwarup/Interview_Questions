import React, { useEffect, useState } from "react";
import { MAX, MIN } from "../Constants";

export default function ProgressBar({ value = 0, onComplete = () => {} }) {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(MAX, Math.max(value, MIN)));

    if (percent > 100 || value > 100) {
      onComplete();
    }
  }, [value]);
  return (
    <div className="main">
      <div role="progress-bar" className="progress">
        <span
          style={{ color: `${percent > 49 ? "#fff" : "#ff0000"}` }}
          className="value"
        >
          {percent.toFixed()}%
        </span>

        <div
          area-aria-valuemax={100}
          area-aria-valuemin={0}
          are-aria-valuenow={percent}
          className="progress-fill"
          //   style={{ width: `${percent}%` }}
          style={{
            transform: `scaleX(${percent / MAX})`,
            transformOrigin: "left",
          }}
        ></div>
      </div>
    </div>
  );
}

// area tags are Use to Accesibilities
