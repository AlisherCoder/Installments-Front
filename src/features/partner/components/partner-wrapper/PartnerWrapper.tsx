import TableView from './table-view/TableView';
import CardView from './card-view/CardView';
import React, { type FC } from 'react';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { Pagination } from 'antd';
import { useParamsHook } from '@/shared/hooks/useParamsHook';

interface Props {
  data: undefined | any;
  loading: boolean;
}

const PartnerWrapper: FC<Props> = ({ data, loading }) => {
  const { getParam, setParam } = useParamsHook();
  const matches = useMediaQuery('768');
  const page = getParam('page') || '1';

  return (
    <>
      {matches ? (
        <CardView data={data?.data} loading={loading} />
      ) : (
        <TableView data={data?.data} loading={loading} />
      )}
      <div className="mt-6 flex justify-end">
        <Pagination
          total={data?.total}
          current={Number(page)}
          onChange={(value) => setParam('page', value.toString())}
          pageSize={10}
        />
      </div>
    </>
  );
};

export default React.memo(PartnerWrapper);
