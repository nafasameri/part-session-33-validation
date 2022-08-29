const connectionManager = require('../../../modules/db/connection-manager');
const Profile = require("../models/profile.model");
const profilesDataStore = require("./profiles.json");

class ProfileRepository {
  constructor(storageType) {
    this.#storageType = storageType;
  }
  fetchAll() {
    if (this.#storageType === 'json') {
      return fetchAllByJSON();
    }
    return fetchAllByDB();
  }

  async fetchAllByJSON() {
    const profiles = this.#createProfileModels(profilesDataStore);
    return profiles;
  }

  async fetchAllByDB() {
    const profilesDataStore = await connectionManager.query('select * from profile', []);// sqli
    const profiles = this.#createProfileModels(profilesDataStore);
    return profiles;
  }

  // avoid DRY
  #createProfileModels(profileDataStore) {
    const profiles = [];
    for (let profile of profileDataStore) {
      let profileModel = new Profile(
        profile.id,
        profile.firstname,
        profile.lastname,
        profile.imageUrl
      );
      profiles.push(profileModel);
    }
    return profiles;
  }
}

module.exports = ProfileRepository;
