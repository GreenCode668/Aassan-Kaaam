import { authConstants, categoryConstant } from "../constants";
import firebase from "firebase";
require("firebase/firestore");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBrnQ1aPl0G9H_NhsAD3gWnsmMDW_LDtMw",
  authDomain: "test-f7380.firebaseapp.com",
  databaseURL: "https://test-f7380.firebaseio.com",
  projectId: "test-f7380",
  storageBucket: "test-f7380.appspot.com",
  messagingSenderId: "136627999162"
};
firebase.initializeApp(config);

var db = firebase.firestore();

export const authActions = {
  register,
  login,
  viewCateogry,
  confirmOrder,
  ViewProfile,
  viewOrders
};

function viewOrders(email) {
  const yourOrder = [];
  return dispatch => {
    db.collection("Order")
      .where("userEmail", "==", email)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          yourOrder.push(doc.data());
        });
        dispatch(success(yourOrder));
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
  function success(orders) {
    return { type: authConstants.VIEW_ORDER, orders };
  }
}

function ViewProfile(data) {
  return dispatch => {
    dispatch(success(data));
  };
  function success(data) {
    return { type: authConstants.CURRENT_PROFILE, data };
  }
}

function confirmOrder(userEmail, SellerEmail, userLocation) {
  return dispatch => {
    db.collection("Order")
      .add({
        userEmail: userEmail,
        sellerEmail: SellerEmail,
        userLocation: userLocation,
        orderConfirm: false,
        orderCompleted: false
      })
      .then(function() {
        console.log("Document successfully written!");
        dispatch(success("Order Confirm"));
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };
  function success(data) {
    return { type: authConstants.ORDER_CONFIRM, data };
  }
}

function viewCateogry(skill) {
  const categories = [];

  return dispatch => {
    db.collection("Users")
      .where(`skills.${skill}`, "==", true)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const user = doc.data();
          categories.push(doc.data());
        });
        dispatch(success(categories));
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
  function success(data) {
    return { type: authConstants.CATEOGRY_SUCCESS, data };
  }
}

function login(email, password) {
  return dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        db.collection("Users")
          .doc(res.user.uid)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              dispatch(success(doc.data()));
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  };

  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: authConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
}

function register(email, password, name, skills) {
  return dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res.user);
        db.collection("Users")
          .doc(res.user.uid)
          .set({
            name: name,
            email: res.user.email,
            skills: skills
          })
          .then(() => {
            dispatch(success(res.user));
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  };

  function request(user) {
    return { type: authConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: authConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
}
