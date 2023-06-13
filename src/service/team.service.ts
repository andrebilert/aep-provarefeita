import TeamModel from '../schema/team.schema';
import PokemonModel from '../schema/pokemon.schema'

class TeamService {
    
    async createTeam(data) {
        try {
          const createdTeam = await TeamModel.create(data);
          return createdTeam;
        } catch (error) {
          throw new Error(error);
        }
      }

    async find() {
        return await TeamModel.find()
    }

    async findTrainerName(trainerName) {
        return await TeamModel.find({trainerName})
    }

    async updateTeam(trainerName, newData) {
        try {
          const updatedTeam = await TeamModel.findOneAndUpdate(
            { trainerName },
            { trainerName: newData.trainerName, team: newData.team },
            { new: true }
          );
          return updatedTeam;
        } catch (error) {
          throw new Error(error);
        }
    }

    async deleteTeam(trainerName) {
        return await TeamModel.deleteOne({trainerName})
    }
}

export default new TeamService()
