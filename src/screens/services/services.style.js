import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  banner: {
    backgroundColor: COLORS.gray5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 25,
  },

  name: {
    textAlign: 'center',
    fontSize: FONT_SIZE.md,
    fontWeight: 'semibold',
    marginTop: 5,
  },

  servicesTitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
    padding: 10,
    alignSelf: 'center',
  },

  containerCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray4,
  },

  check: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.gray3,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },

  checked: {
    color: 'white',
  },

  service: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
    flex: 1,
    paddingLeft: 10,
  },

  containerTotalPrice: {
    padding: 20,
  },

  totalPrice: {
    textAlign: 'center',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#2E66E7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: FONT_SIZE.md,
  },

  disabledService: {
    color: COLORS.gray4,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  notAvailable: {
    color: '#ff4444',
    fontSize: 12,
  },
  available: {
    color: 'green',
    fontSize: 12,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  whatsapp: {
    fontSize: 16,
    color: '#25D366',
    marginTop: 5,
  }
};
