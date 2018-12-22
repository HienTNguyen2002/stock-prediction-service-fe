import { connect } from 'react-redux'
const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
  })
  
const mapDispatchToProps = (dispatch, ownProps) => ({
onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)