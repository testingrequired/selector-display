function App() {
  const codeState = React.useState("<div><p>Hello</p><p>World</p></div>");
  const selectorState = React.useState("");
  const [queryResults, setQueryResults] = React.useState("");

  React.useEffect(() => {
    const doc = new DOMParser().parseFromString(codeState, "text/html");
    const [selector] = selectorState;
    if (selector) {
      const body = doc.querySelector("body");
      try {
        const elements = body.querySelectorAll(selector);
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
    React.createElement(Code, { state: codeState }),
    React.createElement("h2", {}, "Selector"),
    React.createElement(Selector, { state: selectorState }),
    React.createElement("h2", {}, "Results"),
    React.createElement("p", {}, resultsMessage),
    React.createElement(Output, { results: queryResults })
  ]);
}
