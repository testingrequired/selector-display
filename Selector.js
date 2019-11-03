function Selector({ get, set }) {
  const $ = React.createElement;

  return $(
    "div",
    { className: "Selector form-group" },
    $("label", {}, "Selector"),
    $("input", {
      type: "text",
      value: get,
      onChange: evt => set(evt.target.value),
      className: "form-control"
    })
  );
}
