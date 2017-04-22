import { connect } from 'react-redux';
import { TranslationProvider } from 'react-i18n-polyglot';

const mapStateToProps = state => ({ locale: state.locale });

export default connect(mapStateToProps)(TranslationProvider);