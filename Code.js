function Code({ get, set }) {
  const $ = React.createElement;
  const [maxRows, setMaxRows] = React.useState(15);
  const value = get;
  const newlines = value.split("\n").length;
  const limitExpand = newlines > maxRows;
  const rows = limitExpand ? maxRows : newlines;

  return $(
    "div",
    { className: "Code form-group" },
    $("label", {}, "HTML"),
    $("textarea", {
      className: "form-control",
      onChange: evt => set(evt.target.value),
      value,
      rows
    }),
    limitExpand && $("label", {}, "Max Rows"),
    limitExpand &&
      $("input", {
        type: "number",
        value: maxRows,
        className: "form-control",
        min: 1,
        onChange: e => setMaxRows(e.target.value)
      })
  );
}
