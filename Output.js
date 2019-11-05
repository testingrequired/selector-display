function Output({ results }) {
  const $ = React.createElement;

  return $(
    "ul",
    { className: "list-group" },
    ...results.map((result, key) =>
      $(
        "li",
        { className: "list-group-item", key },
        $(
          "pre",
          {},
          $(
            "code",
            {},
            prettier.format(result, {
              parser: "html",
              plugins: prettierPlugins
            })
          )
        )
      )
    )
  );
}
