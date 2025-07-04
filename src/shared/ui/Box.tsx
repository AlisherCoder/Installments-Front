import React, { type ReactNode } from 'react';

const Box = ({ children }: { children: ReactNode }) => {
  return <div className="bg-white p-6 rounded">{children}</div>;
};

export default React.memo(Box);
