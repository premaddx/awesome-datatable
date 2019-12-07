import React from "react";
import ReactDOM from "react-dom";
import './style.css';
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.className = "modal-component";
    this.el.onclick = this.close;
  }

  componentDidMount() {
    const modalRoot = document.getElementById("modal-root");
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    const modalRoot = document.getElementById("modal-root");
    modalRoot.removeChild(this.el);
  }

  close=(e) =>{
    if(e.target === this.el){
      this.props.close();
    }
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal-container" id="modal-container">{this.props.children}</div>,
      this.el
    );
  }
}

export default Modal;
