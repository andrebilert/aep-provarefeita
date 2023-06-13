import { PokemonService } from '../service/pokemon.service';
import { Request, Response } from "express"

class PokemonController {
    async getPokemons(req: Request, res: Response) {
        const pokemon = await new PokemonService().getPokemon()
        return res.status(200).json(pokemon)
    }

    async savePokemons(req: Request, res: Response) {
        const pokemon = await new PokemonService().savePokemonJson()
        return res.status(200).json(pokemon)
    }

    async savePokemonsType(req: Request, res: Response) {
        const pokemonByType = await new PokemonService().savePokemonType('pokeDex.json', 'pokeDexType.json');
        return res.status(200).json(pokemonByType)
    }

    async getPokemonsType(req, res) {
        const {type} = req.params
        const pokemons = await new PokemonService().getPokemonsType(type)
        res.json(pokemons)
    }

    async getPokemonsDex(req, res) {
        const {dex} = req.params
        const pokemons = await new PokemonService().getPokemonsDex(dex)
        res.json(pokemons)
    }

    async getPokemonsName(req, res) {
        const {name} = req.params
        const pokemon = await new PokemonService().getPokemonsName(name)
        res.json(pokemon)
    }
}

export default new PokemonController();