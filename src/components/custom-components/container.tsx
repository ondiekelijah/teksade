interface ContainerProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ id, className = "", children }) => {
  return (
<div id={id} className={`container max-w-screen-lg px-8 py-8 mx-auto sm:px-0 sm:py-0 xl:px-0 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
