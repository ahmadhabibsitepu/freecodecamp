import { Card } from "@/components/ui/card";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Card className="flex w-1/2 flex-col gap-4 p-6">{children}</Card>
    </main>
  );
};

export default Layout;
