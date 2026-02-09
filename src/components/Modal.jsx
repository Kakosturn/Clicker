import { useEffect, useState } from "react";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "#202020",
  border: "2px solid #000",
  borderRadius: "0.625rem",
  boxShadow: 24,
  padding: "2rem 4rem",
  zIndex: 1001,
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  zIndex: 1000,
};

function Modal({ children, isOpen, setIsOpen }) {
  return (
    <div
      className={
        isOpen ? "block pointer-events-auto" : "hidden pointer-events-none"
      }
    >
      <div style={overlayStyle} onClick={() => setIsOpen(false)}></div>
      <div
        className="animate-modalShow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 
        bg-[#202020] border-2 border-black rounded-2xl shadow-2xl z-[1001]"
      >
        {children}
        <button
          style={{ position: "absolute", top: "8px", right: "8px" }}
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Modal;

// import { useEffect, useState } from "react";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   backgroundColor: " rgba(0, 0, 0, 0.8)",
//   border: "2px solid #000",
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
// };
// function Modal() {
//   const [isOpen, setIsOpen] = useState(true);

//   useEffect(() => {}, []);
//   if (isOpen) {
//     return (
//       <div style={{ ...style }}>
//         <p>content</p>
//         <button
//           className="absolute top-0 right-0"
//           onClick={() => setIsOpen((prev) => !prev)}
//         >
//           &times;
//         </button>
//       </div>
//     );
//   }
//   return null;
// }

// export default Modal;
