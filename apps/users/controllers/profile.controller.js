const ProfileRepository = require("../repositories/profile.repository");
const profileRepository = new ProfileRepository();

const getAllProfiles = async (req, res) => {
  try {
    let profiles;
    if (Object.keys(req.params).length) {
      profiles = await profileRepository.fetchById(+req.params.id);
    } else {
      profiles = await profileRepository.fetchAll();
    }
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify(profiles));
  } catch (error) {
    throw error;
  }
};
const updateProfile = async (req, res) => {
  try {
    console.log('start updateProfile')
    // const updateResult = await profileRepository.updateProfile(req.body);
    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.end(JSON.stringify(updateResult));
    res.end(JSON.stringify({
      success: true
    }));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProfiles,
  updateProfile
};