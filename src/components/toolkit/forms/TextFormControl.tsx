
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string,
  name: string
  errorMessage?: string
  inputClassName?: string
};

export default function TextFormControl({
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
      {!!label ? <label htmlFor={props.name} className="text-sm leading-none mb-2.5 font-semibold">
        {label}
      </label> : <label htmlFor={props.name} />}
      <input className={`rounded text-secondary-dark px-2.5 shadow-[0_0_0_1px] shadow-violet-600 h-[35px] focus:shadow-secondary outline-none leading-none ${props.inputClassName}`} placeholder={placeholder ?? "Type a text here"} {...props} autoComplete={props.name} />
      {!!errorMessage && <span className="text-red-400 mt-3">{errorMessage}</span>}
    </div>
  );
}
