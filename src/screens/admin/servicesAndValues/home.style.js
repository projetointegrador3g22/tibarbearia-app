import { COLORS, FONT_SIZE } from '../../../constants/theme';

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

  plus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: COLORS.gray1,
    padding: 10,
    gap: 10 
  },

  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
    textAlign: 'center',
    fontWeight: 'semibold',
  },

  containerCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray4,
  },

  check: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.gray3,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checked: {
    color: 'white',
  },

  service: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray3,
  },

  containerButton: {
    margin: 50,
    
  },

  button: {
    backgroundColor: '#2E66E7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: FONT_SIZE.md,
  },

  editContainer: {
  width: '100%',
  marginBottom: 15,
},
input: {
   borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
  backgroundColor: '#fff',
  // minHeight: 20,
  marginBottom: 10,  
}

};
