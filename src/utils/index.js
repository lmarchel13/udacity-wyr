export const getAvatarByName = ({ name = "" }) => {
  const [firstName = "", lastName = ""] = name.split(" ");

  return firstName[0] + lastName[0];
};
