import {Dimensions} from 'react-native'
module.exports = {
    device :{
      height:Dimensions.get('window').height,
      width:Dimensions.get('window').width,
    }
}