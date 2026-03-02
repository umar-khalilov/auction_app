export class ResponseUserDto {
    /**
     * @param {import('@models/User').default} entity
     */
    constructor(entity) {
        this.id = entity.id;
        this.name = entity.name;
        this.surname = entity.name;
        this.email = entity.email;
        this.login = entity.login;
        this.birthday = entity.birthday;
        this.gender = entity.gender;
    }
}
