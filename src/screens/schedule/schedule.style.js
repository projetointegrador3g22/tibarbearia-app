import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },

  theme: {
    selectedDayBackgroundColor: COLORS.blue,
    selectedDayTextColor: COLORS.white,
    todayTextColor: COLORS.red,
    arrowColor: COLORS.blue,
  },
  textHour: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.gray2,
    marginTop: 20,
  },
};
