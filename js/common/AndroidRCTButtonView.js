// WebView.js
/**
 * Created by 卓原 on 2018/4/2.
 * zhuoyuan93@gmail.com
 */
import {
    requireNativeComponent,
    View,

} from 'react-native';
import PropTypes from 'prop-types';

let initPorps = {
    name: 'AndroidRCTButtonView',
    propTypes: {
        title: PropTypes.string,
        ...View.propTypes // 包含默认的View的属性
    }
};

module.exports = requireNativeComponent('AndroidRCTButtonView', initPorps);