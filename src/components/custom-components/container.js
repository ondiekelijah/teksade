const Container = (props) => {
  return (
    <div id={props.id} className={`container max-w-screen-lg px-8 py-8 mx-auto xl:px-0 ${props.className || ""}`}>
      {props.children}
    </div>
  );
}

export default Container;
