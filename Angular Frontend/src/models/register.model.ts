export class RegisterModel{
    constructor(
        public id: string="",
        public employeeName: string="",
        public email: string="",
        public location: string="",
        public practice: string="",
        public billable: string="",
        public resource: string="",
        public experience: string="",
        public activeStatus: string="",
        public skills: string[]=[],
        public role : string
      )
    {}
}

