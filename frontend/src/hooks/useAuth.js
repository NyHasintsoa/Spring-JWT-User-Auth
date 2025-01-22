const AuthStatus = {
  Unknown: 0,
  Authenticated: 1,
  Guest: 2
};

/**
 * Hook to user authentication
 * @return {Object}
 */
const useAuth = () => {
  const account = {
    username: "admin"
  };
  let status;
  switch (account) {
    case null:
      status = AuthStatus.Guest;
      break;
    case undefined:
      status = AuthStatus.Unknown;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }

  return {
    account,
    status
  };
};

export { useAuth, AuthStatus };
