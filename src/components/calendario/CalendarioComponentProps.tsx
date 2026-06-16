export interface CalendarioComponentProps {
  /** Callback chamado quando o usuário seleciona um dia. Recebe string no formato yyyy-MM-dd. */
  diaSelecionado: (dia: string) => void;
}