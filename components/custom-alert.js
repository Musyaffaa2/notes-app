class CustomAlert extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const message = this.getAttribute("message") || "Ini adalah notifikasi!";
      alert(message);
    }
  }
  
  customElements.define("custom-alert", CustomAlert);
  