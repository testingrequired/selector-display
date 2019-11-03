function Code(props) {
  const { state } = props;
  const [code, setCode] = state;

  return React.createElement(
    "div",
    { className: "Code" },
    React.createElement("textarea", {
      rows: 25,
      value: code,
      onChange: evt => setCode(evt.target.value)
    })
  );
}
