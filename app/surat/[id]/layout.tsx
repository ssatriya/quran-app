import React, { Suspense } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>{children}</div>
    </Suspense>
  );
};

export default RootLayout;
