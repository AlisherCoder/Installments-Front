import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import PartnerPopup from '../partner-popup/PartnerPopup';
import { NavLink } from 'react-router-dom';
import useGetRole from '@/shared/hooks/useGetRole';
import './style.css';
import { Role } from '@/shared/types/types';

const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const role = useGetRole();

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className="mb-4 flex justify-between">
        <div className="flex gap-4">
          <NavLink
            end={true}
            className={'navigation-link  py-0.5 text-gray-500 relative'}
            to={role === Role.customer ? '/' : ''}
          >
            Faollar
          </NavLink>
          <NavLink
            className={'navigation-link  py-0.5 text-gray-500 relative'}
            to={role === Role.customer ? 'customer/archive' : 'archive'}
          >
            Arxivlanganlar
          </NavLink>
          <NavLink
            className={'navigation-link  py-0.5 text-gray-500 relative'}
            to={role === Role.customer ? 'customer/disabled' : 'disabled'}
          >
            O'chirilganlar
          </NavLink>
        </div>
        <div>
          <Button onClick={showModal} type="primary">
            <PlusOutlined />
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <PartnerPopup isModalOpen={isModalOpen} handleCancel={handleCancel} />
      )}
    </>
  );
};

export default React.memo(Navigation);
