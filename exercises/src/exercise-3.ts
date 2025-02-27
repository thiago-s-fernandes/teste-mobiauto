type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type MappedCharacter = {
  nome: string;
  genero: string;
  avatar: string;
  especie: string;
};

async function getRickAndMortyCharacters(): Promise<MappedCharacter[]> {
  try {
    /**
     * Url com todos os ids dos personagens, tive que pegar esses ids diretamente do retorno da API,
     * pois a busca da api só aceita um nome como parâmetro, se eu tivesse que buscar pelos nomes, teria que fazer,
     * um loop de fetch em cada um dos nomes.
     */
    const url = "https://rickandmortyapi.com/api/character/1,2,3,4,5";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    const data: Character[] = await response.json();

    // Mapeia o objeto Character para o objeto MappedCharacter.
    const mappedCharacters: MappedCharacter[] = data.map(
      ({ name, gender, image, species }: Character) => {
        return {
          nome: name,
          genero: gender === "Male" ? "Homem" : "Mulher",
          avatar: image,
          especie: species
        };
      }
    );

    return mappedCharacters;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
}

getRickAndMortyCharacters().then(characters => console.log(characters));
