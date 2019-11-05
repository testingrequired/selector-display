function App() {
  const $ = React.createElement;

  const parser = React.useRef(new DOMParser());
  const [htmlInput, setHtmlInput] = React.useState("");
  const [selector, setSelector] = React.useState("");
  const [selectorError, setSelectorError] = React.useState(false);
  const [selectorResults, setSelectorResults] = React.useState([]);

  React.useEffect(() => {
    if (selector) {
      try {
        setSelectorError(false);

        const doc = parser.current.parseFromString(htmlInput, "text/html");

        const elements = doc.querySelectorAll(selector);

        setSelectorResults(
          Array.prototype.slice.call(elements).map(element => element.outerHTML)
        );
      } catch (e) {
        if (e.message && e.message.includes("is not a valid selector")) {
          setSelectorError(true);
        }

        setSelectorResults([]);
      }
    } else {
      setSelectorResults([]);
    }
  }, [htmlInput, selector]);

  return html`
    <div className="App">
      <${Code} get=${htmlInput} set=${setHtmlInput}><//>
      ${htmlInput
        ? html`
            <div>
              <${Selector} get=${selector} set=${setSelector}><//>
              ${selector &&
                html`
                  ${selectorError &&
                    html`
                      <p className="alert alert-danger">Invalid Selector</p>
                    `}
                  <hr />
                  <h5>Results</h5>
                  <hr />
                  <${Output} results=${selectorResults}><//>
                `}
            </div>
          `
        : html`
            <p className="alert alert-primary">
              Please enter some HTML to begin.
            </p>
          `}
    </div>
  `;
}
