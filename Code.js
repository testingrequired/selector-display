function Code({ get, set }) {
  const [maxRows, setMaxRows] = React.useState(15);
  const [invalidHtml, setInvalidHtml] = React.useState(false);
  const textAreaRef = React.useRef(null);
  const value = get;
  const newlines = value.split("\n").length;
  const limitExpand = newlines > maxRows;
  const rows = limitExpand ? maxRows : newlines;

  React.useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  return html`
    <div>
      <div className="Code form-group">
        <label>HTML</label>
        <textarea
          ref=${textAreaRef}
          className="form-control"
          onChange=${e => {
            set(e.target.value);
            if (invalidHtml) setInvalidHtml(false);
          }}
          onBlur=${() => {
            try {
              const formatted = prettier
                .format(value, {
                  parser: "html",
                  plugins: prettierPlugins
                })
                .slice(0, -1);

              set(formatted);
            } catch (e) {
              console.log(`Invalid HTML: ${e.message}`);
              setInvalidHtml(true);
            }
          }}
          value=${value}
          rows=${rows}
          style=${{ resize: "none" }}
        ></textarea>

        ${limitExpand &&
          html`
            <label>Max Rows</label>
            <input
              type="number"
              value=${maxRows}
              className="form-control"
              min="1"
              onChange=${e => setMaxRows(e.target.value)}
            />
          `}
      </div>

      ${invalidHtml &&
        html`
          <p className="alert alert-warning">
            Invalid HTML. Check console for error.
          </p>
        `}
    </div>
  `;
}
