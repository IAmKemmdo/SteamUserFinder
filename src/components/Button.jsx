export default function Button({ children, type = "button", onClick }){
  return (
    <button class="button" type={type} onClick={onClick}>
      {children}
    </button>
  );
}