import { connect } from 'react-redux'
import ModelBuilder from '../screens/ModelBuilder'

const mapStateToProps = (state, previousProps) =>({
    predictionLoaded: state.predictionLoaded
})

export default connect(
    mapStateToProps
)(ModelBuilder)