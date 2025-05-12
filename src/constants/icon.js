import logo from '../assets/logo.png';
import client from '../assets/client.png';
import service from '../assets/service.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const timeIcon = <AntDesign name="clockcircle" size={18} color="black" />;
const dateIcon = <Ionicons name="calendar" size={18} color="black" />;
const cutIcon = <MaterialCommunityIcons name="content-cut" size={18} />;
const userIcon = <FontAwesome name="user" size={18} />;
const deleteIcon = <AntDesign name="delete" size={18} color="white" />;
const editIcon = <AntDesign name="edit" size={18} color="white" />;
const checkIcon = <AntDesign name="check" size={18} color="white" />;
const viewIcon = <FontAwesome name="eye" size={18} color="white" />;
const plusIcon = <FontAwesome name="plus" size={18} color="blue" />;

export default { logo, client, service, timeIcon, dateIcon, cutIcon, userIcon, deleteIcon, editIcon, checkIcon, viewIcon, plusIcon };
