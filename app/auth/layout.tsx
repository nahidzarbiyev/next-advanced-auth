const AuthLoayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-[#272323]">
      {children}
    </div>
  );
};

export default AuthLoayout;
