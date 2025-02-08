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
};
