import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    paddingVertical: 12,
  },

  containerView: {
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  alinhamentoTexto: {
    flexDirection: 'row',
    marginVertical: 2,
    flexWrap: 'wrap',
  },

  textoNegrito: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },

  Texto: {
    fontSize: 15,
    color: '#333',
    flexShrink: 1,
  },

  badgeStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },

  badgeStatusTexto: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  containerBotoes: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },

  botao: {
    flex: 1,
    backgroundColor: '#0c5fa8',
    minHeight: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  botaoSecundario: {
    backgroundColor: '#c0392b',
  },

  botaoSucesso: {
    backgroundColor: '#27ae60',
  },

  textoBotao: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
});

export default styles;