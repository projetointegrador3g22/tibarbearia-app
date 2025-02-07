import Modal from 'react-native-modal';
import { Text, View } from "react-native";
import Button from "../button/Button";
import { styles } from "./modal.style";


export default function ModalCustom({ isVisible, onCancel, onConfirm, text, cancelButtonText, confirmButtonText }) {
  return (
    <Modal isVisible={isVisible} style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{text}</Text>
              <View style={styles.modalButtons}>
                <Button
                  title={cancelButtonText}
                  type="danger"
                  onPress={onCancel}
                  style={styles.modalButton} // Estilo para o *container* do botão
                />
                <Button
                  title={confirmButtonText}
                  type="primary"
                  onPress={onConfirm}
                  style={styles.modalButton} // Estilo para o *container* do botão
                />
              </View>
            </View>
          </Modal>
  )
}