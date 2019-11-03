function App() {
  const [codeState, setCodeState] = React.useState("");
  const [selectorState, setSelectorState] = React.useState("");
  const [queryResults, setQueryResults] = React.useState("");

  React.useEffect(() => {
    const doc = new DOMParser().parseFromString(codeState, "text/html");

    if (selectorState) {
      const body = doc.querySelector("body");
      try {
        const elements = body.querySelectorAll(selectorState);
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

  const resultsMessage = queryResults.length
    ? `Results: ${queryResults.split("\n").length}`
    : "Results: 0";

  return React.createElement("div", { className: "App" }, [
    React.createElement("h2", {}, "HTML"),
    React.createElement(Code, { get: codeState, set: setCodeState }),
    ...(codeState
      ? [
          React.createElement("h2", {}, "Selector"),
          React.createElement(Selector, {
            get: selectorState,
            set: setSelectorState
          }),
          React.createElement("h2", {}, "Results"),
          React.createElement("p", {}, resultsMessage),
          React.createElement(Output, { results: queryResults })
        ]
      : [React.createElement("p", {}, "Please enter some HTML to begin.")])
  ]);
}
