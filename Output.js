function Output({ results }) {
  const $ = React.createElement;

  return $(
    "ul",
    { className: "list-group" },
    ...results.map((result, key) =>
      $("li", { className: "list-group-item", key }, $("code", {}, result))
    )
  );
}
