export function formatarTelefone(numero: string): string {
    const numerosApenas = numero?.replace(/\D/g, '');
  
    const codigoArea = numerosApenas?.slice(0, 2);
    const prefixo = numerosApenas?.slice(2, 6);
    const sufixo = numerosApenas?.slice(6);
    const telefoneFormatado = `(${codigoArea}) ${prefixo}${sufixo}`;
  
    return telefoneFormatado;
  }