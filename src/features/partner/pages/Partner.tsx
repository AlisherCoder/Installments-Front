import { usePartner } from '../service/usePartners';
import Box from '@/shared/ui/Box';
import Title from '@/shared/ui/Title';
import Options from '../components/options';
import React from 'react';
import PartnerWrapper from '../components/partner-wrapper/PartnerWrapper';
import { useParamsHook } from '@/shared/hooks/useParamsHook';
import { Badge } from 'antd';

const Partner = ({ role }: { role: string }) => {
  const { getPartners } = usePartner();
  const { getParam } = useParamsHook();
  const page = getParam('page') || '1';
  const { data, isPending } = getPartners({ role, page });

  return (
    <Box>
      <Badge count={data?.total} style={{ backgroundColor: '#000' }}>
        <Title className={'mb-4'}>
          {role === 'CUSTOMER' ? 'Mijozlar' : 'Sotuvchilar'} ro'yhati
        </Title>
      </Badge>
      <Options />
      <PartnerWrapper data={data} loading={isPending} />
    </Box>
  );
};

export default React.memo(Partner);
