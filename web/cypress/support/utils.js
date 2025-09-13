export function dataHoje() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth()).padStart(2, "0");
  const ano = hoje.getFullYear();

  return `${dia}/${mes}/${ano}`;
}
