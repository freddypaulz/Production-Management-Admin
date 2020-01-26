class auth {
   constructor() {
      this.authenticated = false;
   }

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
