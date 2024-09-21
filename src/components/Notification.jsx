function Notification({ message, type, t }) {
  function typeHandler() {
    if (type === "error") return "warning.png";
    if (type === "success") return "checkmark.png";
  }
  return (
    <div
      className={`bg-[#363636] px-6 py-3 border-2 animate-jump-in animate-once animate-duration-[200ms]
         animate-ease-linear animate-normal animate-fill-both border-gray-200 flex rounded-md`}
    >
      <img src={`./public/${typeHandler()}`} alt="" className="w-[15%]" />
      <p className="text-2xl">{message}</p>
    </div>
  );
}

export default Notification;
