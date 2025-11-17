import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface BasicDatePickerProps {
  onDateChange: (date: string) => void;
  defaultDate?: string;
}

function BasicDatePicker({ onDateChange, defaultDate }: BasicDatePickerProps) {
  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      const dateString = value.format("YYYY-MM-DD");
      onDateChange(dateString);
    }
  };

  const defaultDateObj = defaultDate ? dayjs(defaultDate) : dayjs();
  const ninetyDaysAgo = dayjs().subtract(90, "days");

  const shouldDisableDate = (date: Dayjs) => {
    return date.isBefore(ninetyDaysAgo, "day");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker label="Select date" onChange={handleDateChange} defaultValue={defaultDateObj} shouldDisableDate={shouldDisableDate} />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export { BasicDatePicker };
