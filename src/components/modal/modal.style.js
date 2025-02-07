import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = {
  modal: {
    width: '50%',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },

  modalText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
    textAlign: 'center',
    width: '100%',
  },

  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    // flex: 1, // Cada botão ocupa o espaço disponível
    // marginHorizontal: 10, // Espaçamento entre os botões
    // minWidth: 100, // Largura mínima para evitar que o botão fique muito pequeno
    // Outros estilos que você já usa para o botão, como padding, borderRadius, etc.
  },
};
