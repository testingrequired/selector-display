function Output({ results }) {
  return html`
    <ul className="Output list-group">
      ${results
        .map(result =>
          prettier
            .format(result, {
              parser: "html",
              plugins: prettierPlugins
            })
            .trim()
        )
        .map(
          (formattedResult, index) =>
            html`
              <li className="list-group-item" key=${index}>
                <pre>
                  <code>
                    ${formattedResult}
                  </code>
                </pre>
              </li>
            `
        )}
    </ul>
  `;
}
