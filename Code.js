function Code({ get, set }) {
  return React.createElement("div", { className: "Code form-group" }, [
    React.createElement("label", {}, "HTML"),
    React.createElement("textarea", {
      rows: get.length ? 15 : 5,
      value: get,
      onChange: evt => set(evt.target.value),
      className: "form-control"
    })
  ]);
}
