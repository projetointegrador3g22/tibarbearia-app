import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    padding: 50,
  },

  containerLogo: {
    alignItems: 'center',
    gap: 10,
  },

  logo: {
    width: 80,
    height: 120,
  },

  inputContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    
    backgroundColor: COLORS.gray5,
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    height: 50,
    gap: 6
  },

  input: {
    flex: 1,
    height: 50,
  },

  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },

  footerLink: {
    color: COLORS.blue,
  },

  placeholderStyle: {
    fontSize: 14,
    color: '#9e9e9e',  // Cor cinza para o placeholder
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'black',    // Cor do texto quando um item está selecionado
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },
};
