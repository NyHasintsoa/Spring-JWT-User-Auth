const wait = function (duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

const show = (title, content) =>
  console.log(
    "\n#########################################\n",
    title,
    content,
    "\n#########################################\n"
  );
export { wait, show };
