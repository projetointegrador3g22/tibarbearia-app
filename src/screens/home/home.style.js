import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
    paddingTop: 30,
  },

  item: {
    marginBottom: 15,
    marginLeft: 10,
  },

  title: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray2,
    marginBottom: 5,
  },

  text: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray1,
    textAlign: 'center',
    fontWeight: 'semibold',
  },
};
