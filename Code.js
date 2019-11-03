function Code({ get, set }) {
  return React.createElement(
    "div",
    { className: "Code" },
    React.createElement("textarea", {
      rows: 25,
      value: get,
      onChange: evt => set(evt.target.value)
    })
  );
}
