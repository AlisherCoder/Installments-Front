import React from 'react';
import { Button, Input, Modal, Form, Select } from 'antd';
import { useLocation } from 'react-router-dom';
import { PatternFormat } from 'react-number-format';
import { Role } from '@/shared/types/types';
import { usePartner } from '../../service/usePartners';

type FieldType = {
  fullname?: string;
  phone?: string;
  secondPhone?: string;
  address?: string;
  role?: Role;
  regionId?: string;
};

interface Props {
  isModalOpen: boolean;
  handleCancel: () => void;
  previousData?: any;
}

const PartnerPopup: React.FC<Props> = ({
  handleCancel,
  isModalOpen,
  previousData,
}) => {
  const { pathname } = useLocation();
  const currentPathname = pathname.split('/')[1];
  const { createPartner, getRegions } = usePartner();
  const { isPending } = createPartner;
  const { data } = getRegions();
  const partner = currentPathname == 'seller' ? 'Sotuvchini' : 'Mijozni';

  const regions = data?.data?.map((item: { name: string; id: string }) => ({
    value: item.id,
    label: item.name,
  }));

  const handleSubmit = (values: FieldType) => {
    values.role = currentPathname === 'seller' ? Role.seller : Role.customer;

    const newPartner: FieldType = {
      fullname: values.fullname,
      phone: values.phone?.replace(/\s/gi, ''),
      role: values.role,
      regionId: values.regionId,
    };

    if (values.address) newPartner.address = values.address;

    if (values.secondPhone) {
      newPartner.secondPhone = values.secondPhone?.replace(/\s/gi, '');
    }

    createPartner.mutate(newPartner, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };

  return (
    <>
      <Modal
        title={previousData ? partner + ' yangilash' : partner + ' yaratish'}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="basic"
          initialValues={previousData}
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="To'liq ism"
            name="fullname"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Viloyat"
            name="regionId"
            rules={[{ required: true, message: 'Please select your region!' }]}
          >
            <Select placeholder="Viloyat tanlash" options={regions} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Manzil"
            name="address"
            rules={[{ required: false, message: 'Please input your address!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Tel raqam"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <PatternFormat
              className="w-full px-2 border border-gray-300 rounded-md"
              format="+998 ## ### ## ##"
              mask={'_'}
              allowEmptyFormatting
              customInput={Input}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Qo'shimcha tel raqam"
            name="secondPhone"
            rules={[{ required: false, message: 'Please input your phone!' }]}
          >
            <PatternFormat
              //   className="w-full px-2 border border-gray-300 rounded-md"
              format="+998 ## ### ## ##"
              mask={'_'}
              allowEmptyFormatting
              customInput={Input}
            />
          </Form.Item>
          <Form.Item label={null}>
            <Button
              loading={isPending}
              className="w-full"
              type="primary"
              htmlType="submit"
            >
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PartnerPopup;
