import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = {
  barber: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 8,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.gray4,
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',

  },
  avatar:{
    width: 50,
    height: 60,
    marginRight: 8,
  },

  name: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray1,
    marginTop: 3,
  },
  id: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray3,
  },

}