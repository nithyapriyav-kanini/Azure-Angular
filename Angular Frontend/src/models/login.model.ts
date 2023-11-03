export class LoginModel{
    constructor(
        public id:string="",
        public email:string= "",
        public password: string="",
        public role:string="",
        public token:string=""){
    }
}