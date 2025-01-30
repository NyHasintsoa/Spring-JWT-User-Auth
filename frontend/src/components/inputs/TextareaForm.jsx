/* eslint-disable react/prop-types */
function TextareaForm({
  register,
  label,
  name,
  options,
  errorField,
  defaultValue = null,
  placeholder = null,
  rows = 4
}) {
  return (
    <>
      <label htmlFor={"input-" + name} className="form-label">
        {label}
      </label>
      <textarea
        {...register(name, options)}
        className={
          "form-control " + (errorField !== undefined ? "is-invalid" : "")
        }
        id={"input-" + name}
        rows={rows}
        placeholder={placeholder}
      >
        {defaultValue}
      </textarea>
      {errorField && (
        <div className="invalid-feedback">{errorField.message}</div>
      )}
    </>
  );
}

export default TextareaForm;
