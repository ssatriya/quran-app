interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="h-screen max-w-[1200px] mx-auto desktop:px-10 mobile:px-8">
      {children}
    </div>
  );
};

export { Container };
