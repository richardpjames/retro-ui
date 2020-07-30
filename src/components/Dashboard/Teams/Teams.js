import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import teamsService from '../../../services/teamsService';
import usersService from '../../../services/usersService';
import NewTeamModal from './NewTeamModal';
import TeamList from './TeamList';

const Teams = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [teams, setTeams] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  // This is the initial load of existing teams for the user
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get the access token required to call the API
        const token = await getAccessTokenSilently();
        // Call the API
        const teams = await teamsService.getAll(token);
        // Update the boards
        if (teams) {
          // Sort the boards
          const _teams = teams.sort((a, b) => {
            if (a.name < b.name) return 1;
            return -1;
          });
          setTeams(_teams);
        }
        const profile = await usersService.getById(user.sub, token);
        setProfile(profile);
        // Stop loading bar
        setLoading(false);
      } catch (error) {
        // For now just log any errors - TODO: Improve error handling
        console.log(error);
        toast.error(error);
      }
    };
    fetchData();
  }, [getAccessTokenSilently, user]);

  const addTeam = async (team) => {
    try {
      setLoading(true);
      // Get the access token required to call the API
      const token = await getAccessTokenSilently();
      const newTeam = await teamsService.create(team, token);
      // Add the new board returned to the existing list
      setTeams([newTeam, ...teams]);
      setLoading(false);
      // Show confirmation to the user
      toast.success('Your new team has been created.');
    } catch (error) {
      // For now just output any errors
      toast.error(error);
    }
  };

  const removeTeam = async (teamId) => {
    try {
      setLoading(true);
      // Get the access token and call the delete endpoint
      const token = await getAccessTokenSilently();
      await teamsService.remove(teamId, token);
      // Remove the board from the state
      let updatedTeams = teams.filter((team) => {
        return team._id !== teamId;
      });
      setTeams(updatedTeams);
      setLoading(false);
      toast.success('Your team has been deleted.');
    } catch (error) {
      // For now just output any errors
      toast.error(error);
    }
  };

  return (
    <div className="content mx-5 my-5">
      <div className="columns is-vcentered">
        <div className="column py-0">
          <h1 className="title is-1 mt-3">Teams</h1>
        </div>
        <div className="column py-0 is-narrow">
          <button
            className="button is-primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <i className="fas fa-plus mr-3"></i> Create New
          </button>
        </div>
      </div>
      <p>
        View an existing team, or create a new one. Teams are shown
        alphabetically.
      </p>
      <NewTeamModal
        teams={teams}
        profile={profile}
        addTeam={addTeam}
        visible={createModalVisible}
        setVisible={setCreateModalVisible}
      />
      <div className="content">
        {(() => {
          if (loading)
            return (
              <progress
                className="progress is-small is-primary my-5"
                max="100"
              ></progress>
            );
        })()}
        <TeamList teams={teams} removeTeam={removeTeam} />
      </div>
    </div>
  );
};

export default Teams;
