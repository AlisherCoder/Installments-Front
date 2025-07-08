import { Button, Form, Input, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useCallback, useState, type FC, type ReactNode } from 'react';
import { NumericFormat } from 'react-number-format';
import { usePayment } from '../../service/usePayment';
import { PaymentType, Role } from '@/shared/types/types';
import { PaymentMethods } from '@/shared/static';

interface Props {
  children: ReactNode;
  id: string;
  previousData?: any;
  role: string;
}

type FieldType = {
  comment?: string;
  amount?: string;
  paymentMethod?: 'CASH' | 'CARD';
};

const PaymentPopup: FC<Props> = ({ children, id, previousData, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createPayment } = usePayment();
  const { isPending } = createPayment;

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSubmit = (values: FieldType) => {
    const amount = Number(values.amount?.replace(/\s/gi, ''));

    let payment: any = {
      amount,
      paymentMethod: values.paymentMethod,
      partnerId: id,
      paymentType: role === Role.customer ? PaymentType.in : PaymentType.out,
    };

    if (values.comment) payment.comment = values.comment;

    createPayment.mutate(payment, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };
  return (
    <>
      <span onClick={showModal}>{children}</span>

      {isModalOpen && (
        <Modal
          title={`${previousData ? "O'zgartirish" : "To'lov qilish"}`}
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
              label="Summa"
              name="amount"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <NumericFormat
                allowLeadingZeros
                thousandSeparator={' '}
                customInput={Input}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="To'lov turini tanlang"
              name="paymentMethod"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Select placeholder="To'lov turi" options={PaymentMethods} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Izoh"
              name="comment"
              rules={[{ required: false }]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                loading={isPending}
                className="w-full"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default React.memo(PaymentPopup);
