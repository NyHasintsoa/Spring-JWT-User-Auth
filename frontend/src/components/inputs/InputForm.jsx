/* eslint-disable react/prop-types */
function InputForm({
  register,
  label,
  name,
  options,
  errorField,
  type,
  defaultValue = null,
  placeholder = null
}) {
  return (
    <>
      <label className="form-label" htmlFor={"input-" + name}>
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        {...register(name, options)}
        type={type}
        className={
          "form-control " + (errorField !== undefined ? "is-invalid" : "")
        }
        id={"input-" + name}
        placeholder={placeholder}
      />
      {errorField && (
        <span className="invalid-feedback">{errorField.message}</span>
      )}
    </>
  );
}

export default InputForm;
