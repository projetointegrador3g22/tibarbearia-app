// import { COLORS, FONT_SIZE } from '../../constants/theme';

// export const styles = {
//   modal: {
//     margin: 'auto',
//   },

//   modalContent: {
//     backgroundColor: 'white',
//     padding: 24,
//     borderRadius: 12,
//     width: '50%',
//     alignItems: 'center',
//   //  backgroundColor: COLORS.red,
//   },

//   modalText: {
//     fontSize: FONT_SIZE.md,
//     color: COLORS.gray1,
//     textAlign: 'center',
//     lineHeight: 24,
//     width: '100%',
//   },

//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 8,
//     marginTop: 48,
//   },

//   passwordInput: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//   }
// };

import { COLORS, FONT_SIZE } from '../../constants/theme';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = {
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    width: width * 0.85, // 85% da largura da tela
    maxWidth: 400, // Largura máxima para tablets
    alignItems: 'center',
  },

  modalText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
    textAlign: 'center',
    lineHeight: 24,
    width: '100%',
    marginBottom: 16,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 24,
    width: '100%',
  },

  // Novos estilos adicionados:
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.gray3,
    borderRadius: 8,
    padding: 14,
    fontSize: FONT_SIZE.md,
    backgroundColor: COLORS.white,
    width: '100%',
    minHeight: 50,
  },

  inputFocused: {
    borderColor: COLORS.primary,
  },
};