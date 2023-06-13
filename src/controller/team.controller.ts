import TeamService from "../service/team.service"

class TeamController {
    async createTeam(req, res) {
        const team = req.body;
      
        try {
          const createdTeam = await TeamService.createTeam(team);
          res.json(createdTeam);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao criar o time' });
        }
    }

    async find(req, res){
        try {
            const teams = await TeamService.find()
            res.json(teams)
        } catch (error) {
            console.log(error)
        }
    }

    async findTrainerName(req, res){
        const {trainerName} = req.params
        
        try {
            const team = await TeamService.findTrainerName(trainerName)
            res.json(team)
        } catch (error) {
            console.log(error)
        }
    }

    async updateTeam(req, res) {
        const { trainerName } = req.params;
        const newData = req.body;
      
        try {
          const updatedTeam = await TeamService.updateTeam(trainerName, newData);
          res.json(updatedTeam);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao atualizar' });
        }
    }

    async deleteTeam(req, res) {
        const {trainerName} = req.params

        try {
            const deleteTeam = await TeamService.deleteTeam(trainerName)
            res.json(deleteTeam)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new TeamController()
