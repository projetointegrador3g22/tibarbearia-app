import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },

  calendar: {
    flex: 1,
  },

  theme: {
    selectedDayBackgroundColor: COLORS.blue,
    selectedDayTextColor: COLORS.white,
    todayTextColor: COLORS.red,
    arrowColor: COLORS.blue,
  },
  textHour: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'semibold',
    color: COLORS.gray2,
    marginTop: 20,
  },

  containerHour: {
    margin: 'auto',
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
  disabledButton: {
    backgroundColor: '#cccccc',
  },
};
