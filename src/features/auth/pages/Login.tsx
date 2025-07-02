import React from 'react';
import type { FormProps } from 'antd';
import { Alert, Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import type { LoginI, TokenI } from '@/shared/types/auth';
import { useAuth } from '../service/login';
import { setToken } from '../store/auth.slice';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const { isPending, isError } = login;

  const onFinish: FormProps<LoginI>['onFinish'] = (values) => {
    login.mutate(values, {
      onSuccess: (res: TokenI) => {
        dispatch(setToken(res));
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
          <Form.Item<LoginI>
            label="Telefon raqam"
            name="phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<LoginI>
            label="Parol"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          {isError && (
            <div className="mb-4">
              <Alert
                message={'username or password is incorrect'}
                type="error"
              />
            </div>
          )}

          <Form.Item style={{ margin: 0 }} label={null}>
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
      </div>
    </div>
  );
};

export default React.memo(Login);
