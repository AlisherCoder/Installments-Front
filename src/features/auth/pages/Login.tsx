import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { useLogin } from '../hooks/useLogin';
import { useDispatch } from 'react-redux';
import type { TokenI } from '@/shared/types/auth';
import { authLogin } from '../store/auth.slice';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  phone: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigete = useNavigate();
  const { login } = useLogin();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    login.mutate(values, {
      onSuccess: (res: TokenI) => {
        dispatch(authLogin(res));
        navigete('/');
        message.success('Tizimga kirish muvaffaqiyatli bajarildi!');
      },
      onError: (e) => {
        message.error(e.message);
      },
    });
  };

  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="max-w-[400px] w-full p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Tizimga kirish</h2>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Telefon raqam"
            name="phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Parol"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item style={{ margin: 0 }} label={null}>
            <Button className="w-full" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(Login);
