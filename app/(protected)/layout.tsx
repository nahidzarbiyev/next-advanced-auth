import Navbar from "./settings/_components/navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col gapp-y-10 items-center justify-center bg-[#272323]">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
