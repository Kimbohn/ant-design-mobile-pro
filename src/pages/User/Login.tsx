import React from 'react';
import { Toast, Button } from 'antd-mobile';
import { history } from 'umi';
import { createForm } from 'rc-form';
import Paper from '@/components/Paper';
import Form from '@/components/Form';
import { ItemConfig } from '@/components/Form/Props';
import CustomIcon from '@/components/CustomIcon';
import { Dispatch, ConnectState } from '@/models/connect';
import styles from './Login.less';
import { useLogin } from '@/hooks/user';
import { setAuthority } from '@/utils/authority';
const defaultSettings = require('@/defaultSettings');

const { publicPath } = defaultSettings;

const logo = `${publicPath}logo.svg`;
const iconStyle = { fontSize: '.48rem', color: '#776e6e' };

const setItems: (form: any, config: any) => ItemConfig[] = (form, config) => {
  const { handleKeyPress } = config;
  return [
    {
      field: 'username',
      label: <CustomIcon type='user' style={iconStyle} />,
      fieldProps: {
        rules: [
          {
            required: true,
            message: '请输入姓名',
          },
        ],
      },
      componentProps: {
        placeholder: '请输入帐号：admin',
        autoComplete: 'off',
        labelNumber: 1,
      },
    },
    {
      field: 'password',
      label: <CustomIcon type='password' style={iconStyle} />,
      fieldProps: {
        rules: [
          {
            required: true,
            message: '请输入密码',
          },
        ],
      },
      componentProps: {
        type: 'password',
        placeholder: '请输入密码：123456',
        autoComplete: 'off',
        labelNumber: 1,
        onKeyPress: handleKeyPress,
      },
    },
  ];
};

export interface LoginProps {
  form: any;
}

export default createForm()((props: LoginProps) => {
  const { form } = props;
  const { run: runLogin, loading } = useLogin();

  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      console.log(err, values);
      if (err) {
        return;
      }

      const response = await runLogin(values);

      setAuthority(response.currentAuthority);
      if (response.status === 'ok') {
        history.replace('/');
      } else {
        Toast.fail('帐号或密码错误！');
      }
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const icon = (
    <div className={styles.logoWrapper}>
      <img src={logo} alt='' />
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <Paper icon={icon}>
        <Form
          style={{ marginTop: '.64rem' }}
          form={form}
          items={setItems(form, { handleKeyPress })}
          buttonText={null}
          errorsFooter={false}
          hideRequiredMark
        />
        <Button
          type='primary'
          style={{ margin: '.64rem 0.08rem' }}
          loading={loading}
          onClick={handleSubmit}
        >
          登录
        </Button>
      </Paper>
    </div>
  );
});
