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
    // marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barberContent: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 50,
    marginRight: 7,
  },

  name: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray1,
  },
  
   containerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  button: {
    marginHorizontal: 5,
    width: '25%',
    borderRadius: '10%'
  },

};
