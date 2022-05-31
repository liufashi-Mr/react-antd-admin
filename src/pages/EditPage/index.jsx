import React, { Component } from 'react';
import { connect } from 'react-redux';
class Edit extends Component {
  componentDidMount() {}
  render() {
    return <div>Edit Page</div>;
  }
}

const mapStateToProps = state => {
  return { name: state.CommonModel.name + '1' };
};
export default connect(mapStateToProps)(Edit);
