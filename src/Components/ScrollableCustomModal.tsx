import React from "react";
import ReactDom from "react-dom";
const MODAL_STYLES = {
  position: "absolute",
  backgroundColor: "#FFF",
  padding: "15px",
  zIndex: "1000",
  width: "555%",
  borderRadius: ".5em",
};
const OVERLAY_STYLE = {
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0, .8)",
  zIndex: "1000",
  overflowY: "auto",
};

interface CoolModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ScrollableCustomModal = ({ children, onClose }: CoolModalProps) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0, .4)",
          zIndex: "1000",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "#ffede0",
            padding: "15px",
            margin: "30px",
            zIndex: "1000",
            width: "66%",
            borderRadius: ".5em",
          }}
          onClick={onClose}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default ScrollableCustomModal;
