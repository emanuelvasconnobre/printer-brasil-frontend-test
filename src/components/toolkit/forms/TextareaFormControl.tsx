
type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label?: string,
  name: string
  errorMessage?: string,
  countCols?: number
  inputClassName?: string
};

export default function TextareaFormControl({
  label,
  placeholder,
  errorMessage,
  countCols,
  className,
  ...props
}: Props) {
  return (
    <div
      className={`mb-[15px] w-full flex flex-col justify-start ${className}`}
    >
      {!!label && <span className="text-sm leading-none font-semibold mb-2.5">
        {label}
      </span>}
      <textarea cols={countCols} className={`rounded text-secondary-dark px-2.5 py-2 shadow-[0_0_0_1px] shadow-violet-600 h-[35px] focus:shadow-secondary outline-none leading-none ${props.inputClassName}`} placeholder={placeholder ?? "Type a text here"} {...props} />
      {!!errorMessage && <span className="text-red-400 mt-3">{errorMessage}</span>}
    </div>
  );
}
