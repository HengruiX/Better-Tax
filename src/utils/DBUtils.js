const queryUserDoc = async (firebase, authUser) => {
  const docRef = firebase.db.collection("users").doc(authUser.uid);
  return await docRef.get();
};

export const getUserCompletion = async (firebase, authUser) => {
  const userDoc = await queryUserDoc(firebase, authUser);
  return userDoc.data().completion;
};

export const completeItem = async (firebase, authUser, item) => {
  const docRef = firebase.db.collection("users").doc(authUser.uid);
  const userDoc = await docRef.get();
  const completion = userDoc.data().completion;
  completion[item] = true;
  await docRef.update({
    completion: completion
  });
};

export const updateUser = async (firebase, authUser, data) => {
  const docRef = firebase.db.collection("users").doc(authUser.uid);
  await docRef.update(data);
};
