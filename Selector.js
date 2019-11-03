function Selector(props) {
  const { state } = props;
  const [selector, setSelector] = state;

  return React.createElement(
    "div",
    { className: "Selector" },
    React.createElement("input", {
      type: "text",
      value: selector,
      onChange: evt => setSelector(evt.target.value)
    })
  );
}
