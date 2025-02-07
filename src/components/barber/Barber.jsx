import { Image, Text, TouchableOpacity, View } from "react-native";
import {styles} from './barber.style';

export default function Barber (props) {
  return (
    <TouchableOpacity style={styles.barber} onPress={() => props.onPress(props.id, props.name, props.avatar)} >
      <Image source={props.avatar} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{props.name}</Text>
        {/* <Text style={styles.id}>{props.id}</Text> */}
      </View>
    </TouchableOpacity>
  )
}