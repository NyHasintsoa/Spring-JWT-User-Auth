function getProfileUrl(name) {
  return new URL(`${name}`, import.meta.url);
}

export { getProfileUrl };
