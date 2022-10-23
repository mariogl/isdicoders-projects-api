const rootPaths = {
  users: {
    root: "/users",
  },
  challenges: {
    root: "/challenges",
  },
  projects: {
    root: "/projects",
  },
};

const paths = {
  users: {
    ...rootPaths.users,
    registerUser: `/register`,
    loginUser: `/login`,
  },
  challenges: {
    ...rootPaths.challenges,
  },
  projects: {
    ...rootPaths.projects,
  },
};

export default paths;
