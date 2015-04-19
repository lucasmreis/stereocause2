export const getDb = uri => client =>
  new Promise((resolve, reject) => client.connect(uri,
    (err, db) => !!err ? reject(err) : resolve(db)));

export const closeDb = okAndDb => {
  const [ok, db] = okAndDb;
  db.close();
  return ok;
};

const mongoFunc = func => query => collection => db =>
  new Promise((resolve, reject) =>
    db.collection(collection)[func](query,
      (err, ok) => !!err ? reject(err) : resolve([ok, db])));

export const aggregate = mongoFunc('aggregate');

export const insertObj = mongoFunc('insert');

// export const aggregate = query => collection => db =>
//   new Promise((resolve, reject) =>
//     db.collection(collection).aggregate(query,
//       (err, ok) => !!err ? reject(err) : resolve([ok, db])));

// export const insertObj = obj => collection => db =>
//   new Promise((resolve, reject) =>
//     db.collection(collection).insert(obj,
//       (err, ok) => !!err ? reject(err) : resolve([ok, db])));
