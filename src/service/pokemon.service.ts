import { readFile, writeFile } from "fs/promises";
import PokemonSchema from "../schema/pokemon.schema";


export class PokemonService {
  constructor() {}

  //1) a)
  async getPokemon() {
    const getPoke = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = await getPoke.json();
    const pokemonList = data.results;

    const pokemonDataArray: any[] = [];

    for (const pokemon of pokemonList) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      const pokemonObject = {
        name: pokemonData.name,
        types: pokemonData.types.map((type: { type: { name: string } }) => type.type.name),
        stats: pokemonData.stats.map((stat: { base_stat: number; stat: { name: string } }) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        id: pokemonData.id,
        height: pokemonData.height,
        weight: pokemonData.weight,
        moves: pokemonData.moves.slice(0, 4).map((move: { move: { name: string } }) => move.move.name),
      };

      pokemonDataArray.push(pokemonObject);
    }
    return pokemonDataArray;
  }

  //1) b)
  async savePokemonJson() {
    const savePoke = await this.getPokemon();
    await writeFile("pokeDex.json", JSON.stringify(savePoke, null, 2));
    console.log("Pokémons salvos com sucesso!");
  }

  //2)
  async savePokemonType(file: string, destination: string) {
    const pokemonList = await readFile("pokeDex.json", "utf-8");

    const pokemons = JSON.parse(pokemonList);

    const pokemonsByType: Record<string, any[]> = {};

    pokemons.map((pokemon: any) => {
      const { types } = pokemon;
      const primaryType = types[0];

      if (!pokemonsByType[primaryType]) {
        pokemonsByType[primaryType] = [];
      }
      pokemonsByType[primaryType].push(pokemon);
    });

    for (const type in pokemonsByType) {
      pokemonsByType[type].sort((a, b) => a.id - b.id);
    }

    await writeFile("pokeDexType.json", JSON.stringify(pokemonsByType, null, 2));
    console.log("Pokémons mapeados por tipo e salvos com sucesso!");
  }

  async createPokemon(name: string, types: string[], stats: { name: string; value: number }[], id: number, height: number, weight: number, moves: string[]) {
    const pokemon = new PokemonSchema({
      name,
      types,
      stats,
      id,
      height,
      weight,
      moves,
    });

    try {
      await pokemon.save();
      console.log("Pokémon criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar o Pokémon:", error);
    }
  }

  //4)
  async getPokemonsType(type) {
    return await PokemonSchema.find({tipo: type})
  }
  //5)
  async getPokemonsDex(numDex) {
    return await PokemonSchema.find({numDex})
  }
  //6)
  async getPokemonsName(name) {
    return await PokemonSchema.find({name})
  }

}
