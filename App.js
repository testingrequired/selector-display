function App() {
  const parser = React.useRef(new DOMParser());
  const [codeState, setCodeState] = React.useState("");
  const [selectorState, setSelectorState] = React.useState("");
  const [selectorError, setSelectorError] = React.useState(false);
  const [queryResults, setQueryResults] = React.useState([]);

  React.useEffect(() => {
    const doc = parser.current.parseFromString(codeState, "text/html");

    if (selectorState) {
      try {
        setSelectorError(false);
        const elements = doc.querySelectorAll(selectorState);

        setQueryResults(
          Array.prototype.slice.call(elements).map(element => element.outerHTML)
        );
      } catch (e) {
        debugger;
        if (e.message && e.message.includes("is not a valid selector")) {
          setSelectorError(true);
        }

        setQueryResults([]);
      }
    } else {
      setQueryResults([]);
    }
  }, [codeState, selectorState]);

  return React.createElement("div", { className: "App" }, [
    React.createElement(Code, { get: codeState, set: setCodeState }),
    ...(codeState
      ? [
          React.createElement(Selector, {
            get: selectorState,
            set: setSelectorState
          }),
          ...(selectorState
            ? [
                selectorError &&
                  React.createElement(
                    "p",
                    { className: "alert alert-danger" },
                    "Invalid Selector"
                  ),
                React.createElement("hr"),
                React.createElement("h5", {}, "Results"),
                React.createElement("hr"),
                React.createElement(Output, { results: queryResults })
              ]
            : [])
        ]
      : [
          React.createElement(
            "p",
            { className: "alert alert-success" },
            "Please enter some HTML to begin."
          )
        ])
  ]);
}
