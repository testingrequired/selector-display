function App() {
  const [codeState, setCodeState] = React.useState("");
  const [selectorState, setSelectorState] = React.useState("");
  const [queryResults, setQueryResults] = React.useState("");

  React.useEffect(() => {
    const doc = new DOMParser().parseFromString(codeState, "text/html");

    if (selectorState) {
      try {
        const elements = doc.querySelectorAll(selectorState);
        let results = [];
        elements.forEach(element => {
          results.push(element.outerHTML);
        });
        setQueryResults(results.join("\n"));
      } catch (e) {
        setQueryResults("");
      }
    } else {
      setQueryResults("");
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
