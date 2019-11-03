function Output({ results }) {
  return React.createElement(
    "ul",
    { className: "list-group" },
    results
      .split("\n")
      .map(result =>
        React.createElement(
          "li",
          { className: "list-group-item" },
          React.createElement("code", {}, result)
        )
      )
  );
}
