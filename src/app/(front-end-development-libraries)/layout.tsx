"use client";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <script
        src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"
        defer
      />
    </>
  );
};

export default Layout;
