class auth {
   constructor() {
      this.authenticated = true;
   }
   authenticated = true;
   login = value => {
      console.log(value);
      this.authenticated = value;
   };

   logout() {
      this.authenticated = false;
   }

   isAuthenticated() {
      return this.authenticated;
   }
}

export default new auth();
