export default function (data) {
  //Parses data in the database for use. Imports outside IDs and returns a json.
  return Object.keys(data).map(key => {
    return {
      id: key,
      ...data[key],
    };
  });
}
