import { connect } from 'react-redux'
import ParameterTuning from '../components/prediction-core/ParameterTuning'

const mapStateToProps = (state, previousProps) =>({
    active: state.active
})

export default connect(
    mapStateToProps
)(ParameterTuning)