import React from "react";
import "rc-time-picker/assets/index.css";

import moment from "moment";

import TimePicker from "rc-time-picker";
const showSecond = false;
const str = showSecond ? "HH:mm:ss" : "HH:mm";
const Time = ({ setData, data }) => {
  function onChange(value) {
    console.log(value && value.format(str));
    setData({ ...data, heure: value && value.format(str) });
  }
  function generateOptions(length, excludedOptions) {
    const arr = [];
    for (let value = 0; value < length; value++) {
      if (excludedOptions.indexOf(value) < 0) {
        arr.push(value);
      }
    }
    return arr;
  }
  function disabledMinutes(h) {
    switch (h) {
      case 9:
        return generateOptions(60, [30]);
      case 21:
        return generateOptions(60, [0]);
      default:
        return generateOptions(60, [0, 30]);
    }
  }
  return (
    <div>
      <TimePicker
        style={{ width: 100 }}
        showSecond={showSecond}
        defaultValue={moment()}
        className="xxx"
        onChange={onChange}
        disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23]}
        disabledMinutes={disabledMinutes}
      />
      ,
    </div>
  );
};

export default Time;
