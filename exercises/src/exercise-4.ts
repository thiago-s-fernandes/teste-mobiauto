function checkIfTheFirstLetterIsUppercase(word: string): boolean {
  /**
   * Valida se a palavra tem ao menos um char ou se ela não é apenas um espaço.
   */
  if (!word || !word.trim()) return false;

  /**
   * Valida se a primeira letra da palavra é maiúscula.
   */
  const validateFirstLetterIsUppercase = word[0] === word[0].toUpperCase();

  return validateFirstLetterIsUppercase;
}

console.log(checkIfTheFirstLetterIsUppercase(""));
console.log(checkIfTheFirstLetterIsUppercase(" "));
console.log(checkIfTheFirstLetterIsUppercase("Brasil"));
console.log(checkIfTheFirstLetterIsUppercase("mobiauto"));
console.log(checkIfTheFirstLetterIsUppercase("xXx xXx"));
console.log(checkIfTheFirstLetterIsUppercase("xDD"));
console.log(checkIfTheFirstLetterIsUppercase("Deu Certo!"));
