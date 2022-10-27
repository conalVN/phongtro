import { memo } from "react";

function InputForm({
  label,
  type,
  keyPayload,
  value,
  setValue,
  invalidFields,
  setInvalidFields,
}) {
  return (
    <>
      <label htmlFor={keyPayload}>{label}</label>
      <input
        type={type}
        id={keyPayload}
        className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [keyPayload]: e.target.value }))
        }
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields.length > 0 &&
        invalidFields.some((i) => i.name === keyPayload) && (
          <small className="text-red-400 italic">
            {invalidFields.find((i) => i.name === keyPayload)?.message}
          </small>
        )}
    </>
  );
}

export default memo(InputForm);
