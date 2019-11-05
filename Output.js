function Output({ results }) {
  return html`
    <ul className="list-group">
      ${results.map((result, key) => {
        const formattedHtml = prettier.format(result, {
          parser: "html",
          plugins: prettierPlugins
        });

        return html`
          <li className="list-group-item" key=${key}>
            <pre>
                <code>
                  ${formattedHtml}
                </code>
              </pre>
          </li>
        `;
      })}
    </ul>
  `;
}
