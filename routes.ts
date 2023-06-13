import { Router } from "express";
import pokemonController from "./src/controller/pokemon.controller";
import TeamController from "./src/controller/team.controller"


const routes = Router();

routes.get('/pokemons', pokemonController.getPokemons)
routes.post('/pokemons', pokemonController.savePokemons)
routes.post('/pokemonstypes', pokemonController.savePokemonsType)
routes.get('/pokemon/type/:type', pokemonController.getPokemonsType)
routes.get('/pokemon/dex/:dex', pokemonController.getPokemonsDex)
routes.get('/pokemon/name/:name', pokemonController.getPokemonsName)

routes.post('/team', TeamController.createTeam)
routes.get('/team', TeamController.find)
routes.get('/team/trainerName/:trainerName', TeamController.findTrainerName)
routes.put('/team/:trainerName', TeamController.updateTeam)
routes.delete('/team/:trainerName', TeamController.deleteTeam)

export default routes;