import { connect } from 'react-redux'
import BuildButton from '../components/prediction-core/BuildButton'

const mapStateToProps = (state, previousProps) =>({
    active: state.active,
    params: state.params
})

export default connect(
    mapStateToProps
)(BuildButton)