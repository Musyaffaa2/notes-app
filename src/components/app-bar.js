class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .app-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #48A6A7;
          color: white;
          padding: 15px 20px;
          font-size: 20px;
          font-weight: bold;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        }
        .title {
          text-align: center; 
        }
        .menu {
          cursor: pointer;
          font-size: 24px;
        }
      </style>
      <div class="app-bar">
        <span class="title">${this.getAttribute('title') || 'Notes App'}</span>
      </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
