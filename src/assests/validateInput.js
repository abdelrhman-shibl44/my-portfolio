
export const validateInput = (name,value) => {
  let error = "";
      switch (name) {
          case "name":
              if (!value) {
                  error= "Please enter your name"
              }
              break;
          case "email":
              if (!value) {
                  error= "Please enter your email"
              }else if(!/\S+@\S+\.\S+/.test(value)) {
                error= "Please enter a valid email address"
              }
              break;
          case "message":
              if (!value) {
                  error= "Please enter your email"
              }
              break;
          default:
              break;
      }
      return error;
};