function Code({ get, set }) {
  const [maxRows] = React.useState(20);
  const [invalidHtml, setInvalidHtml] = React.useState(false);
  const newlines = get.split("\n").length;
  const textAreaRef = React.useRef(null);

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
                .format(get, {
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
          value=${get}
          rows=${newlines > maxRows ? maxRows : newlines}
          style=${{ resize: "none" }}
          spellcheck="false"
        ></textarea>
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
