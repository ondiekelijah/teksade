interface ContainerProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  id,
  className = "",
  children,
}) => {
  return (
    <div
      id={id}
      className={`container mx-auto max-w-screen-xl px-4 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
