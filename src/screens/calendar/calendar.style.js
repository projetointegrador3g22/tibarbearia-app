import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
  },

  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
    marginBottom: 15,
    marginLeft: 10,
  },

  iconPlusContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  
  iconPlus: {
    color: 'white',
  },

  textPlus: {
    color: 'white',
    fontSize: FONT_SIZE.sm,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  listContent: {
    padding: 16,
  },
};
