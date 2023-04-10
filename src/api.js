// api.js

const fetchData = async () => {
  try {
    const res = await fetch(`http://localhost:${process.env.PORT | 5050}/getData`)
    const data = res.json()
    return data
  } catch (err) {
    console.log(err)
  }
};

const checkProjectLink = async (projectLink) => {
  try {
    const res = await fetch(projectLink);
    if (res.status !== 200) {
      return false;
    } else {
      if (/^https?:\/\/\S+$/.test(projectLink)) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    return false;
  }
};

export {
  fetchData,
  checkProjectLink
};