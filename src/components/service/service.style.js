import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.gray4,
  },
  service: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray3,
    marginTop: 5,
  },
  price: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.blue,
    marginTop: 3,
  },
  containerText: {
    flex: 1,
  },
  containerButton: {
    width: 100,
  },
};
