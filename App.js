function App() {
  const parser = React.useRef(new DOMParser());
  const [html, setHtml] = React.useState("");
  const [selector, setSelector] = React.useState("");
  const [selectorError, setSelectorError] = React.useState(false);
  const [selectorResults, setSelectorResults] = React.useState([]);

  React.useEffect(() => {
    if (selector) {
      try {
        setSelectorError(false);

        const doc = parser.current.parseFromString(html, "text/html");

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
  }, [html, selector]);

  const selectorInput = React.createElement(Selector, {
    get: selector,
    set: setSelector
  });

  const selectorErrorAndResults = React.createElement(
    React.Fragment,
    {},
    selectorError &&
      React.createElement(
        "p",
        { className: "alert alert-danger" },
        "Invalid Selector"
      ),
    React.createElement("hr"),
    React.createElement("h5", {}, "Results"),
    React.createElement("hr"),
    React.createElement(Output, { results: selectorResults })
  );

  return React.createElement(
    "div",
    { className: "App" },
    React.createElement(Code, { get: html, set: setHtml }),
    html
      ? React.createElement(
          React.Fragment,
          {},
          selectorInput,
          selector && selectorErrorAndResults
        )
      : React.createElement(
          "p",
          { className: "alert alert-success" },
          "Please enter some HTML to begin."
        )
  );
}
