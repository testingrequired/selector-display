function App() {
  const $ = React.createElement;

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

  const selectorInput = $(Selector, {
    get: selector,
    set: setSelector
  });

  const selectorErrorAndResults = $(
    React.Fragment,
    {},
    selectorError &&
      $("p", { className: "alert alert-danger" }, "Invalid Selector"),
    $("hr"),
    $("h5", {}, "Results"),
    $("hr"),
    $(Output, { results: selectorResults })
  );

  return $(
    "div",
    { className: "App" },
    $(Code, { get: html, set: setHtml }),
    html
      ? $(
          React.Fragment,
          {},
          selectorInput,
          selector && selectorErrorAndResults
        )
      : $(
          "p",
          { className: "alert alert-success" },
          "Please enter some HTML to begin."
        )
  );
}
