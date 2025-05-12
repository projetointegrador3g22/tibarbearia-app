import { COLORS, FONT_SIZE } from '../../../constants/theme';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  item: {
    borderWidth: 1,
    borderColor: COLORS.gray4,
    paddingLeft: 8,
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray3,
    marginBottom: 4,
  },
  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
  },

  buttons: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    width: '40%',
    margin: 'auto',
    gap: 20,
  },

  containerButton: {
    alignSelf: 'center',
    gap: 10,
    flexDirection: 'row',
  },

  passwordInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#fff',
    color: '#333',
    width: 300,
    textAlign: 'center',
  }
};
