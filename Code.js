function Code({ get, set, maxRows = 15 }) {
  const value = get;
  const rows = value.split("\n").length;
  const r = rows > maxRows ? maxRows : rows;

  return React.createElement("div", { className: "Code form-group" }, [
    React.createElement("label", {}, "HTML"),
    React.createElement("textarea", {
      className: "form-control",
      onChange: evt => set(evt.target.value),
      value,
      rows: r
    })
  ]);
}
