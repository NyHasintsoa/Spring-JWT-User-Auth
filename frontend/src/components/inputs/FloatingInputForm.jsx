/* eslint-disable react/prop-types */
function FloatingInputForm({
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
    <div className="form-floating mb-3">
      <input
        defaultValue={defaultValue}
        {...register(name, options)}
        type={type}
        className={
          "form-control " + (errorField !== undefined ? "is-invalid" : "")
        }
        id={"floating-" + name}
        placeholder={placeholder}
      />
      <label htmlFor={"floating-" + name}>{label}</label>
      {errorField && (
        <span className="invalid-feedback">{errorField.message}</span>
      )}
    </div>
  );
}

export default FloatingInputForm;
