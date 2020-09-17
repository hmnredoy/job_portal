export default class Gate {
    constructor(user) {
        this.user = user
    }
    isCompany() {
        return this.user.type === 'company'
    }isApplicant() {
        return this.user.type === 'applicant'
    }check() {
        return this.user.type === 'company' || this.user.type === 'applicant'
    }
}
