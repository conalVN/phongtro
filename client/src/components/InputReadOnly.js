function InputReadOnly({ label, value, placeholder, full }) {
  return (
    <label className="flex flex-col gap-2">
      {label}
      <input
        type="text"
        placeholder={placeholder}
        className={`${
          full ? "" : "max-w-500"
        } bg-gray-100 border border-gray-300 outline-none rounded-md p-2`}
        readOnly
        value={value || ""}
      />
    </label>
  );
}

export default InputReadOnly;
