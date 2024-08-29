import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  label?: string;
  name: string;
  value?: Date;
  errorMessage?: string;
  inputClassName?: string;
  placeholder?: string;
  className?: string;
  onChange: (date: Date | null) => void;
};

export default function DateFormControl({
  label,
  placeholder,
  errorMessage,
  className,
  ...props
}: Props) {
  return (
    <div
      className={`mb-[15px] w-full flex flex-col justify-start ${className}`}
    >
      {!!label ? (
        <label
          htmlFor={props.name}
          className="text-sm leading-none mb-2.5 font-semibold"
        >
          {label}
        </label>
      ) : (
        <label htmlFor={props.name} />
      )}
      <DatePicker
        selected={props.value}
        onChange={props.onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder ?? "Type a text here"}
        className={`rounded w-full text-secondary-dark px-2.5 shadow-[0_0_0_1px] shadow-violet-600 h-[35px] focus:shadow-secondary outline-none leading-none ${props.inputClassName}`}
      />
      {!!errorMessage && (
        <span className="text-red-400 mt-3">{errorMessage}</span>
      )}
    </div>
  );
}
