import * as React from "react";
import * as ReactDOM from "react-dom";
import { DateTimePicker } from "@progress/kendo-react-dateinputs";

const DateHeure = ({handleDetails}) => {
  

  return (
    <div >
     
      <div >
        <DateTimePicker name="date"  onChange={handleDetails} />
      </div>
    </div>
  );
};
export default DateHeure