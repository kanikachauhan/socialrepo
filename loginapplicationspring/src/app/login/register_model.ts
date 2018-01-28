export class RegistrationModel{

    public fname:string;
    public lname:string;
    public username:string;
    public email:string;
    public passwd:string;
    public cpasswd:string;
    public location:string;
    public question:string;
    public answer:string;
    constructor(){
        this.fname='';
        this.lname='';
        this.email='';
        this.passwd='';
        this.cpasswd='';
        this.location='';
        this.username = '';
        this.question='';
        this.answer='';
    }
fromJSON(json) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }
}