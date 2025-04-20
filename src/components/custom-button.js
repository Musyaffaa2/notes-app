class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
          button[type="submit"] {
              background-color: #48A6A7; 
              color: #fff; 
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s ease-in-out;
          }
          button[type="submit"]:hover {
              background-color: #006A71; 
      </style>
      <button>${this.getAttribute('text')}</button>
    `;
  }
}

customElements.define('custom-button', CustomButton);
