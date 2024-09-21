import { useEffect, useState } from "react";

const modalStyle = {
  position: "absolute",
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

function Modal({ content }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {}, []);

  if (isOpen) {
    return (
      //   <>
      //     <div
      //       className="fixed inset-0 bg-black bg-opacity-80 z-40"
      //       onClick={() => console.log("div")}
      //     ></div>
      //     <div className="fixed inset-0 flex items-center justify-center z-50">
      //       <div className="bg-gray-800 border-2 border-black rounded-md shadow-xl p-16 w-3/4 max-w-lg z-50 relative">
      //         <p>{content}</p>
      //         <button
      //           className="absolute top-4 right-4 text-gray-200"
      //           onClick={() => setIsOpen(false)}
      //         >
      //           &times;
      //         </button>
      //       </div>
      //     </div>
      //   </>
      <>
        <div style={overlayStyle} onClick={() => setIsOpen(false)}></div>
        <div style={modalStyle} className="animate-modalShow">
          <p>{content}</p>
          <button
            style={{ position: "absolute", top: "8px", right: "8px" }}
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>
      </>
    );
  }

  return null;
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
