function InputForm2({
  label,
  unit,
  note,
  name,
  value,
  setValue,
  invalidFields,
  setInvalidFields,
}) {
  return (
    <label htmlFor="title" className={`${unit ? "w-1/2" : "w-full"}`}>
      {label}
      <div className="flex items-center border border-gray-200 rounded-md">
        <input
          id="title"
          type="text"
          className="flex-1 p-2 outline-none"
          value={value}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [name]: e.target.value }))
          }
          onFocus={() => setInvalidFields([])}
        />
        {unit && (
          <span className="flex items-center justify-center flex-none p-2 w-16 rounded-tr-md rounded-br-md bg-gray-100">
            {unit}
          </span>
        )}
      </div>
      {note && <small className="opacity-60 ">{note}</small>}
      <small className="text-red-500 block w-full">
        {invalidFields?.some((item) => item.name === name) &&
          invalidFields?.find((item) => item.name === name)?.message}
      </small>
    </label>
  );
}

export default InputForm2;
