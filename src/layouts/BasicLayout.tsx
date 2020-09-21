import React, { useEffect } from 'react';
import { history, withRouter } from 'umi';
import { connect } from 'dva';
import { TransitionGroup } from 'react-transition-group';
import { Dispatch, ConnectState } from '@/models/connect';
import { getAuthority } from '@/utils/authority';
// import { formatMessage } from 'umi-plugin-react/locale';

export interface BasicLayoutProps {
  dispatch: Dispatch;
  location: Location;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { dispatch, children, location } = props;
  useEffect(() => {
    if (getAuthority()[0] !== 'admin') {
      history.push('/user/login');
    }
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  return <TransitionGroup>{children}</TransitionGroup>;
};

export default connect(({ settings }: ConnectState) => ({
  settings,
}))(withRouter(BasicLayout as any));
