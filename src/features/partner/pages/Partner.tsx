import { usePartner, type IParams } from '../service/usePartners';
import Box from '@/shared/ui/Box';
import Title from '@/shared/ui/Title';
import Options from '../components/options';
import React from 'react';
import { useParamsHook } from '@/shared/hooks/useParamsHook';
import { Badge } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

const Partner = ({ role }: { role: string }) => {
  const { getPartners } = usePartner();
  const { getParam } = useParamsHook();
  const page = getParam('page') || '1';
  const { pathname } = useLocation();
  const typeName = pathname.split('/')[2] || 'active';

  const query: IParams = {
    role,
    page,
    orderBy: 'desc',
    isArchive: 'false',
    isActive: 'true',
  };

  if (typeName === 'archive') {
    query.isArchive = 'true';
  }

  if (typeName === 'disabled') {
    query.isActive = 'false';
  }

  const { data, isFetching } = getPartners(query);

  return (
    <Box>
      <Badge count={data?.total} style={{ backgroundColor: '#000' }}>
        <Title className={'mb-4'}>
          {role === 'CUSTOMER' ? 'Mijozlar' : 'Sotuvchilar'} ro'yhati
        </Title>
      </Badge>
      <Options />
      <Outlet context={{ data, isFetching }} />
    </Box>
  );
};

export default React.memo(Partner);
