export class UserDetails{
	public id :string;
	public username :string;
	public firstname :string;
	public lastname :string;
	public birthday :string;
	public location :string;
	public gender :string;
	public email :string;
	public industry :string;
	public flag :string;
	public creationDate :string;
	public updateDate :string;
	public role :string;
	public providerUserId : string;
	public password: string;
	public confirmPassword: string;
	constructor(){
		this.id='';
		this.username='';
		this.birthday='';
		this.creationDate='';
		this.email='';
		this.firstname='';
		this.gender='';
		this.lastname='';
		this.industry='';
		this.flag='';
		this.gender='';
		this.updateDate='';
		this.role='';
		this.providerUserId='';
		this.location='';
		this.password='';
		this.confirmPassword='';
}
	fromJSON(json) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }
}