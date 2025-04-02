class AppBar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
            .app-bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #007bff;
                color: white;
                padding: 15px 20px;
                font-size: 20px;
                font-weight: bold;
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
            }
            .menu {
                cursor: pointer;
                font-size: 24px;
            }
        </style>
        <div class="app-bar">
            <span class="menu">☰</span>
            <span class="title">${this.getAttribute("title") || "Notes App"}</span>
        </div>
      `;
    }
  }
  
  customElements.define("app-bar", AppBar);
  