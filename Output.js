function Output({ results }) {
  return React.createElement(
    "ul",
    { className: "list-group" },
    results.map(result =>
      React.createElement(
        "li",
        { className: "list-group-item" },
        React.createElement("code", {}, result)
      )
    )
  );
}
