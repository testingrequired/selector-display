function Code({ get, set }) {
  const [maxRows, setMaxRows] = React.useState(15);
  const value = get;
  const newlines = value.split("\n").length;
  const limitExpand = newlines > maxRows;
  const rows = limitExpand ? maxRows : newlines;

  return React.createElement("div", { className: "Code form-group" }, [
    React.createElement("label", {}, "HTML"),

    React.createElement("textarea", {
      className: "form-control",
      onChange: evt => set(evt.target.value),
      value,
      rows
    }),
    limitExpand && React.createElement("label", {}, "Max Rows"),
    limitExpand &&
      React.createElement("input", {
        type: "number",
        value: maxRows,
        className: "form-control",
        onChange: e => setMaxRows(e.target.value)
      })
  ]);
}
