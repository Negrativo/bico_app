import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFCFC',
    flex: 1,
  },
  conteudo: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 32,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  vazioWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  textoVazio: {
    fontSize: 16,
    color: '#555',
  },
});

export default styles;
