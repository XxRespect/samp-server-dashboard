
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
 
      <main className="">
        {children}
      </main>

    </div>
  );
};

export default AdminLayout;
