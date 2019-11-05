function Output({ results, enablePrettier }) {
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
            enablePrettier
              ? prettier.format(result, {
                  parser: "html",
                  plugins: prettierPlugins
                })
              : result
          )
        )
      )
    )
  );
}
