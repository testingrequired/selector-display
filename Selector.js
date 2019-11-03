function Selector({ get, set }) {
  return React.createElement(
    "div",
    { className: "Selector" },
    React.createElement("input", {
      type: "text",
      value: get,
      onChange: evt => set(evt.target.value)
    })
  );
}
