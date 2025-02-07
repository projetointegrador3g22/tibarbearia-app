import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // padding: 12,
    // paddingTop: 27
  },
  banner: {
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 25,
  },
  name: {
    textAlign: 'center',
    fontSize: FONT_SIZE.md,
    // color: COLORS.white,
    fontWeight: 'bold',
    marginTop: 5,
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
