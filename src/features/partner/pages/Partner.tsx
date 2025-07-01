import React from 'react';

const Partner = ({ role }: { role: string }) => {
  return <div className="">Partner {role}</div>;
};

export default React.memo(Partner);
