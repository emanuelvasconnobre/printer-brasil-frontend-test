type Props = {
  options: number[];
  selectedValue: number;
  onSelectHandler: (value: number) => void;
};

export default function RowsCounterPaginator(props: Props) {
  return (
    <>
      <select
        onChange={({ target: { value } }) =>
          props.onSelectHandler(parseInt(value))
        }
      >
        {props.options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </>
  );
}
