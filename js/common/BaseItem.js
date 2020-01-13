import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';
import {PropTypes} from 'prop-types';
const ThemeColor = 'red';
export default class BaseItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        onPressFavorite: PropTypes.func,
        onFavorite: PropTypes.func,
        isFavorite: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.isFavorite,
        }
    }

    onPress() {
        this.isFavorite = !this.state.isFavorite;
       this.setState({
          isFavorite : !this.state.isFavorite,
       });       
       const {onPressFavorite,item} = this.props;
       onPressFavorite && onPressFavorite(this.isFavorite,item);
    }

    _favoriteIcon() {

        return <TouchableOpacity
            style={{padding: 6}}
            underlayColor='transparent'
            onPress={() => this.onPress()}>
            <FontAwesome
                name={this.state.isFavorite ? 'star' : 'star-o'}
                size={26}
                style={{color: ThemeColor}}
            />
        </TouchableOpacity>
    }
}