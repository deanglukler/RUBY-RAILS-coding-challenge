import React, { PureComponent } from 'react';

export default class Loading extends PureComponent {
  state = {
    show: this.props.loading,
    fade: false,
  };

  componentDidUpdate(prevProps) {
    const loading = this.props.loading;
    const wasLoading = prevProps.loading;
    const show = this.state.show;
    if (loading && !show) {
      this.setState({ show: true });
    }
    if (!loading && wasLoading) {
      this.setState({ fade: true });
      setTimeout(() => {
        this.setState({ show: false });
      }, 800);
    }
    if (loading && !wasLoading) {
      this.setState({
        show: true,
        fade: true,
      });
    }
  }

  render() {
    const { show, fade } = this.state;
    return (
      show && (
        <div
          style={{
            transition: 'opacity 200ms ease',
            opacity: `${fade ? 0 : 1}`,
          }}
          className="bg-grey-lighter fixed pin flex justify-center items-center z-10"
        >
          <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      )
    );
  }
}
