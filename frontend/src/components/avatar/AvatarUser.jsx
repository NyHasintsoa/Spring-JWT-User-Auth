// eslint-disable-next-line react/prop-types
function AvatarUser({ src, alt = "avatar-user", className, rounded }) {
  return (
    <>
      <div
        className={"avatar " + className + (rounded ? " rounded-circle" : "")}
      >
        <img
          className={"avatar-img " + (rounded ? "rounded-circle" : "")}
          src={src}
          alt={alt}
        />
      </div>
    </>
  );
}

export default AvatarUser;
