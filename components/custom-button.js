class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
          button {
              padding: 10px;
              font-size: 16px;
              color: white;
              background: #007bff; /* Ubah warna menjadi biru */
              border: none;
              border-radius: 5px;
              cursor: pointer;
          }
      </style>
      <button>${this.getAttribute("text")}</button>
    `;
  }
}

customElements.define("custom-button", CustomButton);