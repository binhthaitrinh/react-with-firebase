import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }
    onSendEmailVerification = async () => {
      await this.props.firebase.doSendEmailVerification();
      this.setState({ isSent: true });
    };
    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <p>
                    Email confirmation sent. Check your email. Refresh once you
                    confirm Email
                  </p>
                ) : (
                  <p>Verify your Email for verification</p>
                )}

                <button
                  disabled={this.state.isSent}
                  type="button"
                  onClick={this.onSendEmailVerification}>
                  Send confirmation Email
                </button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return withFirebase(WithEmailVerification);
};

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

export default withEmailVerification;
