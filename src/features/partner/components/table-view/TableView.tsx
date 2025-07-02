import { Button, Table } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import React, { type FC } from 'react';
import './style.css';
import { useParamsHook } from '@/shared/hooks/useParamsHook';

interface Props {
  data: undefined | any;
  loading: boolean;
}

const TableView: FC<Props> = ({ data, loading }) => {
  const { getParam } = useParamsHook();
  const page = getParam('page') || '1';

  const columns = [
    {
      title: '№',
      dataIndex: 'index',
      key: 'index',
      render: (_value: any, _item: any, index: number) => {
        return <span>{index + 1 + (Number(page) - 1) * 10}</span>;
      },
    },
    {
      title: 'Ism',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Manzil',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Telefon',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Balans',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance: string) => {
        const i = Number(balance);
        const color = i > 0 ? 'green' : i < 0 ? 'crimson' : 'gray';
        return <b style={{ color }}>{i.fprice()}</b>;
      },
    },
    {
      title: 'Viloyat',
      dataIndex: 'region',
      key: 'region',
      render: (region: any) => {
        return region.name;
      },
    },
    {
      title: 'Option',
      dataIndex: 'option',
      key: 'option',
      render: () => {
        return (
          <div className="flex gap-2 justify-end">
            <Button>To'lov</Button>
            <Button>
              <MoreOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        loading={loading}
        dataSource={data}
        rowKey={'id'}
        columns={columns}
        pagination={false}
        scroll={{ x: 900 }}
      />
    </>
  );
};

export default React.memo(TableView);
