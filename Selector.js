function Selector({ get, set }) {
  return html`
    <div className="Selector form-group">
      <label>Selector</label>
      <input
        type="text"
        value=${get}
        onChange=${e => set(e.target.value)}
        className="form-control"
      />
    </div>
  `;
}
