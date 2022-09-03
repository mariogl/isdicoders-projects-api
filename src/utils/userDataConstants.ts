const usernameMinLength = 5;
const userpasswordMinLength = 6;
const userpasswordMaxLength = 30;

const userDataConstants = {
  username: {
    min: usernameMinLength,
  },
  password: { min: userpasswordMinLength, max: userpasswordMaxLength },
};

export default userDataConstants;
