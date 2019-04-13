export const parseW2 = async (file, firebase) => {
  const url = await uploadFile(file, firebase);
  const jsondata = await uploadFileToServer(url);
  return jsondata;
};

const uploadFile = async (file, firebase) => {
  const storageRef = firebase.storage.ref();
  const randString =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
  const pathName = "userfiles/" + randString;
  const fileRef = storageRef.child(pathName);
  await fileRef.put(file);
  return await fileRef.getDownloadURL();
};

const uploadFileToServer = async url => {
  const res = await fetch("https://pdfparsertax.herokuapp.com/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      location: url
    })
  });
  return await res.json();
};
