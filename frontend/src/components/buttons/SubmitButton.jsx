/* eslint-disable react/prop-types */
function SubmitButton({ isSubmitting, defaultText, submitText, className }) {
  return (
    <button className={className} type="submit" disabled={isSubmitting}>
      {!isSubmitting ? (
        defaultText
      ) : (
        <div className={"d-flex align-items-center"}>
          <span className={"fw-bold"}>{submitText}</span>
          <span
            className={"spinner-border ms-auto"}
            role={"status"}
            aria-hidden={true}
          ></span>
        </div>
      )}
    </button>
  );
}

export default SubmitButton;
