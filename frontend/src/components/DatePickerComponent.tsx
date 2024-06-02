import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerComponentProps {
  fromDate: Date | null;
  toDate: Date | null;
  onFromDateChange: (date: Date | null) => void;
  onToDateChange: (date: Date | null) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}) => {
  return (
    <div className="flex gap-5">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          From Date
        </label>
        <DatePicker
          selected={fromDate}
          onChange={(date) => onFromDateChange(date)}
          selectsStart
          startDate={fromDate}
          endDate={toDate}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          To Date
        </label>
        <DatePicker
          selected={toDate}
          onChange={(date) => onToDateChange(date)}
          selectsEnd
          startDate={fromDate}
          endDate={toDate}
          minDate={fromDate}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default DatePickerComponent;
