import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = {
  barber: {
    // flex: 1,
    // backgroundColor: COLORS.red,
    padding: 8,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.gray4,
    marginTop: 30,
    // marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barberContent: {
    flexDirection: 'row',
    width: '50%',
    gap: 10,
    alignItems: 'center',
    // backgroundColor: COLORS.red,
  },

  avatar: {
    width: 40,
    height: 50,
    marginRight: 7,
  },

  name: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray1,
  },

  containerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10
    // backgroundColor: COLORS.red,
  },

  button: {
    // marginHorizontal: 5,
    width: '25%',
    borderRadius: '10%',
  },
};
