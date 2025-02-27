function maskify(string: string): string {
  /**
   * Transforma a string em uma array
   */
  const splittedWord: string[] = string.split("");

  /**
   * Valida se o tamanho da array é menor ou igual a 4, para retornar seu valor inicial.
   */
  if (splittedWord?.length <= 4) {
    return string;
  }

  /**
   * Mapeia a array de chars, validando se o index atual é menor que o tamanho da array - 4, ou seja,
   * se o index não chegou até as ultimas 4 letras que tem de ser vísiveis, ele irá retornar "#", após isso,
   * todas os chars são juntados.
   */
  const maskedWord: string = splittedWord
    .map((char, idx, arr) => (idx < arr.length - 4 ? "#" : char))
    .join("");

  return maskedWord;
}

console.log(maskify("4556364607935616"));
console.log(maskify("64607935616"));
console.log(maskify("1"));
console.log(maskify(""));
console.log(maskify("Skippy"));
console.log(maskify("Nanananananananananana Batman!"));
