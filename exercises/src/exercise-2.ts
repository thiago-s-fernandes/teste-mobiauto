function updateData<T extends Record<string, unknown>>(
  currentObject: T,
  newDataObject: Record<string, unknown>
): T {
  /**
   * Inicia um novo objeto, copiando as propriedades do objeto atual, para preservar a imutabilidade do mesmo.
   */
  const updatedObject = { ...currentObject };

  /**
   * Faz um mapeamento das propriedades do novo objeto (newDataObject), validando se a mesma existe no objeto atual (currentObject),
   * caso exista, atribui o valor da propriedade ao objeto atual, caso contrario, ignora a propriedade. Mantendo assim a imutabilidade.
   */
  for (const key in newDataObject) {
    if (key in currentObject) {
      (updatedObject as Record<string, unknown>)[key] = newDataObject[key];
    }
  }

  return updatedObject;
}

console.log(
  updateData(
    { name: "Marcos", country: "Brasil", age: 22 },
    { country: "Japão", age: 33 }
  )
);
console.log(
  updateData(
    { name: "Marcos", country: "Brasil", age: 22 },
    { price: 89.9, amount: 15, description: "camiseta 100% algodão" }
  )
);
console.log(
  updateData(
    { name: "Rafael", country: "Chile", age: 42 },
    { name: "Camiseta Polo", price: 59.9, amount: 30 }
  )
);
console.log(updateData({}, { name: "Camiseta Polo", price: 59.9, amount: 30 }));
console.log(updateData({ name: "Rafael", country: "Chile", age: 42 }, {}));
