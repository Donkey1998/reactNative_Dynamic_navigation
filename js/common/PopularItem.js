import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BaseItem from './BaseItem';

export default class PopularItem extends BaseItem {

    render() {
        const {item,onSelect} = this.props;
        if(!item||!item.owner) return null;
        return(
            <TouchableOpacity
              onPress={()=>{onSelect && onSelect()}}
            >
               <View style={styles.cell_container}>
                   <Text style={styles.title}> {item.full_name}</Text>
                   <Text style={styles.description}> {item.description}</Text>
                   <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Author:</Text>
                            <Image style={{height: 22, width: 22}}
                                   source={{uri: item.owner.avatar_url}}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Start:</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        {this._favoriteIcon()}
                   </View>
               </View>
            </TouchableOpacity>
        );
        
    }
}

const styles = StyleSheet.create({
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        elevation: 2
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        color: '#757575',
        lineHeight:22,
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },  
}
);
