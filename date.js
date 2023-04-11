exports.getDate = function () {
  const today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return (day = today.toLocaleDateString("en-US", options));
};

exports.getDay = function () {
  const today = new Date();
  let options = {
    weekday: "long",
  };
  return (day = today.toLocaleDateString("en-US", options));
};
