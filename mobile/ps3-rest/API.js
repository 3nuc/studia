import axios from "axios";
class API {
  api = axios.create({ baseURL: "http://ergast.com/api/f1/" });

  /**
   *
   */
  getRaces(season = "current", round = "") {
    if (!round)
      return this.api.get(`${season}/results.json`).then(({ data }) => {
        return data.MRData.RaceTable.Races;
      });
    // can also do /results/1.json
    else
      return this.api
        .get(`${season}/results/${round}.json`)
        .then(({ data }) => data.MRData.RaceTable.Races);
  }

  getStandings(season = "current") {
    return this.api.get(`${season}/driverStandings.json`).then(({ data }) => {
      console.log(data);
      return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
  }

  getDrivers(season = "current") {
    return this.api.get(`${season}/drivers.json`).then(({ data }) => {
      console.log(data);
      return data.MRData.DriverTable.Drivers;
    });
  }
}

export const ErgastAPI = new API();
