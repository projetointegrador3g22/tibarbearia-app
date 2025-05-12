// import Modal from 'react-native-modal';
// import { Text, View } from 'react-native';
// import Button from '../button/Button';
// import { styles } from './modalCustom.style';

// export default function ModalCustom({
//   isVisible,
//   onCancel,
//   onConfirm,
//   text,
//   cancelButtonText = "Cancelar",
//   confirmButtonText = "Confirmar",
//   confirmButtonDisabled = false,
//   children
// }) {
//   return (
//     <Modal 
//       isVisible={isVisible} 
//       style={styles.modal}
//       backdropOpacity={0.7}
//       animationIn="fadeIn"
//       animationOut="fadeOut"
//     >
//       <View style={styles.modalContent}>
//         <Text style={styles.modalText}>{text}</Text>
        
//         {children}
        
//         <View style={styles.modalButtons}>
//           <Button 
//             title={cancelButtonText} 
//             type="danger" 
//             onPress={onCancel} 
//           />
//           <Button
//             title={confirmButtonText}
//             type={confirmButtonDisabled ? 'disabled' : 'primary'}
//             onPress={onConfirm}
//             disabled={confirmButtonDisabled}
//           />
//         </View>
//       </View>
//     </Modal>
//   );
// }
import Modal from 'react-native-modal';
import { Text, View, TextInput } from 'react-native';
import Button from '../button/Button';
import { styles } from './modalCustom.style';

export default function ModalCustom({
  isVisible,
  onCancel,
  onConfirm,
  text,
  cancelButtonText = "Cancelar",
  confirmButtonText = "Confirmar",
  confirmButtonDisabled = false,
  children,
  inputProps // Adicione esta prop para configurações específicas de input
}) {
  return (
    <Modal 
      isVisible={isVisible} 
      style={styles.modal}
      backdropOpacity={0.7}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.modalContent}>
        {text && <Text style={styles.modalText}>{text}</Text>}
        
        {children}
        
        <View style={styles.modalButtons}>
          <Button 
            title={cancelButtonText} 
            type="danger" 
            onPress={onCancel} 
            style={{ flex: 1 }}
          />
          <Button
            title={confirmButtonText}
            type={confirmButtonDisabled ? 'disabled' : 'primary'}
            onPress={onConfirm}
            disabled={confirmButtonDisabled}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </Modal>
  );
}