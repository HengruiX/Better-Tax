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

export const getReturn = async (firebase, authUser) => {
  const userDoc = await queryUserDoc(firebase, authUser);
  return userDoc.data().federal_tax;
}

export const uploadAll = async (firebase, authUser) => {
  const userDoc = await queryUserDoc(firebase, authUser);
  const data = userDoc.data();
  const payload = {
    '8': data.wages,
    '5.E': data.visaType,
    'H2016': data.last_yr_history['2016'],
    'H2017': data.last_yr_history['2017'],
    'H2018': data.last_yr_history['2018'],
    '5.C.y': data.greenCard == 'yes',
    '5.C.n': data.greenCard == 'no',
    '62a': data.federal_tax,
    'identifying': data.ssn,
    'firstName': data.firstName,
    'lastName': data.lastName,
    'address': data.addressLine,
    'city': data.city + data.zipCode,
    'filing_status_2': true,
    '23': data.wages,
    '5.A': data.citizenship,
    '5.B': data.citizenship,
    '5.D.1.n': true,
    '5.D.2.n': true,
    '5.E': data.visaType,
    '5.F.n': true,
    '5.I.y': true,
    '5.I': '2017, 1040NR',
    '5.J.n': true,
    '5.K.n': true,
    '35': data.wages,
    '36': data.wages,
  }

  const keys = Object.keys(data.days_stayed);

  for (var i = 0; i < keys.length; i++) {
    payload['G' + (i + 1)] = keys[i];
  }

  for (var i = keys.length; i < 12; i++) {
    payload['G' + (i + 1)] = '';
  }

  const res = await fetch(process.env.REACT_APP_FINAL_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const jsonres = await res.json();
  return jsonres['url'];
}
