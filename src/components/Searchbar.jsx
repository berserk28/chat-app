import React from "react";

const Searchbar = () => {
  return (
    <div className="searchbar">
      <input type="text" placeholder="enter a name" />
      
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

           
          } catch (err) {
            console.log('small error')
          }
        });
      });
    } catch (err) {
      console.log('big error')
    }
    </div>
  );
};

export default Searchbar;
