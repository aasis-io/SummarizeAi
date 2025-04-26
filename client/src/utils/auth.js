export const getUserFromLocalStorage = () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(token, user);

    if (!token || !user || !user._id) {
      return null;
    }

    return { token, user };
  } catch (error) {
    console.error("Error retrieving user from storage:", error);
    return null;
  }
};
