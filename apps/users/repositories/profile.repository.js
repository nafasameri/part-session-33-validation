const connectionManager = require('../../../modules/db/connection-manager');
const Profile = require("../models/profile.model");
const profilesDataStore = require("./profiles.json");

class ProfileRepository {
  constructor(storageType) {
    this._storageType = storageType;
    this._id;
    this._connectionManager = connectionManager();
  }

  fetchAll() {
    if (this._storageType === 'json') {
      return this.fetchAllByJSON();
    }
    return this.fetchAllByDB();
  }

  fetchById(id) {
    this._id = id;
    if (this._storageType === 'json') {
      return this.fetchByIdByJSON();
    }
    return this.fetchByIdByDB();
  }

  async fetchByIdByJSON() {
    let profile = profilesDataStore.filter(profile => {
      return profile.id === this._id;
    });
    profile = this._createProfileModels(profile);
    return profile;
  }

  async fetchByIdByDB() {
    const profilesDataStore = await this._connectionManager.query('select * from users where id=$1', [this._id]);// sqli
    const profiles = this._createProfileModels(profilesDataStore);
    return profiles;
  }

  async fetchAllByJSON() {
    const profiles = this._createProfileModels(profilesDataStore);
    return profiles;
  }

  async fetchAllByDB() {
    const profilesDataStore = await this._connectionManager.query('select * from users', []);// sqli
    const profiles = this._createProfileModels(profilesDataStore);
    return profiles;
  }

  // avoid DRY
  _createProfileModels(profileDataStore) {
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

  async updateProfile(profile) {
    const result = await this._connectionManager.query(
      'update users set firstname=$2, lastname=$3, imageUrl=$4 where id=$1',
      [profile.id, profile.firstname, profile.lastname, profile.imageUrl]
    );// sqli
    return result;
  }
}

module.exports = ProfileRepository;
