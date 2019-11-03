function Output({ results }) {
  return React.createElement(
    "ul",
    { className: "list-group" },
    ...results.map((result, key) =>
      React.createElement(
        "li",
        { className: "list-group-item", key },
        React.createElement("code", {}, result)
      )
    )
  );
}
