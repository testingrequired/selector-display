function Code({ get, set }) {
  const $ = React.createElement;
  const [maxRows, setMaxRows] = React.useState(15);
  const [invalidHtml, setInvalidHtml] = React.useState(false);
  const value = get;
  const newlines = value.split("\n").length;
  const limitExpand = newlines > maxRows;
  const rows = limitExpand ? maxRows : newlines;

  return $(
    React.Fragment,
    {},
    $(
      "div",
      { className: "Code form-group" },
      $("label", {}, "HTML"),
      $("textarea", {
        className: "form-control",
        onChange: evt => {
          set(evt.target.value);
          if (invalidHtml) setInvalidHtml(false);
        },
        onBlur: () => {
          try {
            const formatted = prettier.format(value, {
              parser: "html",
              plugins: prettierPlugins
            });

            set(formatted);
          } catch (e) {
            console.log(`Invalid HTML: ${e.message}`);
            setInvalidHtml(true);
          }
        },
        value,
        rows,
        style: {
          resize: "none"
        }
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
    ),
    invalidHtml &&
      $(
        "p",
        { className: "alert alert-warning" },
        "Invalid HTML. Check console for error."
      )
  );
}
