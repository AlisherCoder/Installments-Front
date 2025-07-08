import Box from '@/shared/ui/Box';
import Title from '@/shared/ui/Title';
import React from 'react';
import { useParams } from 'react-router-dom';

const DetialPartner = () => {
  const p = useParams();
  console.log(p);

  return (
    <Box>
      <Title>Detail page</Title>
    </Box>
  );
};

export default React.memo(DetialPartner);
