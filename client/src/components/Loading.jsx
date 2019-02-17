import React, { PureComponent } from 'react';

export default class Loading extends PureComponent {
  state = {
    show: true,
    fade: false,
  };

  componentDidUpdate(prevProps) {
    const loading = this.props.loading
    const wasLoading = prevProps.loading
    if (!loading && wasLoading) {
      this.setState({
        fade: true,
      });
      setTimeout(() => {
        this.setState({
          show: false,
          fade: false,
        });
      }, 500);
    }
    if (loading && !wasLoading) {
      this.setState({
        show: true,
        fade: false,
      });
    }
  }

  render() {
    const { show, fade } = this.state;
    return (
      show && (
        <div
          style={{
            transition: 'opacity 700ms ease',
            opacity: `${fade ? 0 : 1}`,
          }}
          className="bg-grey-lighter absolute pin flex justify-center items-center z-10"
        >
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
      )
    );
  }
}
