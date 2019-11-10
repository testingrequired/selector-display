function App() {
  const queryParams = useQuery();

  const [htmlInput, setHtmlInput] = React.useState("");
  const [selector, setSelector] = React.useState("");
  const [selectorError, setSelectorError] = React.useState(false);
  const [selectorResults, setSelectorResults] = React.useState([]);

  const parser = React.useRef(new DOMParser());
  const db = React.useRef(firebase.firestore());

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

  React.useEffect(() => {
    if (queryParams.get("share")) {
      db.current
        .collection("shares")
        .doc(queryParams.get("share"))
        .get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();

            if (data.html) {
              setHtmlInput(data.html);
            }

            if (data.selector) {
              setSelector(data.selector);
            }
          }
        });
    }
  }, []);

  return html`
    <div className="App">
      <${Code} get=${htmlInput} set=${setHtmlInput} />

      ${htmlInput
        ? html`
            <div>
              <${Selector} get=${selector} set=${setSelector} />

              ${selector &&
                html`
                  <${React.Fragment}>
                    ${selectorError &&
                      html`
                        <p className="alert alert-danger">Invalid Selector</p>
                      `}
                    <hr />
                    <h5>Results</h5>
                    <hr />
                    <${Output} results=${selectorResults} />
                  <//>
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

  function useQuery() {
    return new URLSearchParams(ReactRouterDOM.useLocation().search);
  }
}
