import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = {
  top:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  } ,
  price: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray1,
  },
  appointment: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.gray4,
  },
  name: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
  },
  service: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray3,
    marginBottom: 4,
  },
  container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItens: 'center',
  },
  containerBooking: {
    flex: 1,
    justifyContent: 'space-between',
  },
  booking: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerButton: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  date: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray3,
  },
  time: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray3,
  },
};
