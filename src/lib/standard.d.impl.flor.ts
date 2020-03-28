export const inserir = <T> (ctx: T[], elemento: T, posicao: number): T[] => {
  return ctx.splice(posicao, 0, elemento)
}
