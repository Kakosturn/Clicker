function Button({ children, type, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-lg border-2 py-5 px-10 hover:bg-gray-700 border-gray-200 rounded-lg ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
