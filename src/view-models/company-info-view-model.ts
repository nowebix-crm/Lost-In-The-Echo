import type { CompanyInfoType } from "../constants/users-contstants";

class CompanyInfoViewModel {
    declare id: string;
    declare companyName?: string | undefined;
    declare department?: string | undefined;
    declare position?: string | undefined;

    constructor(private companyInfo: CompanyInfoType) {
        this.id = companyInfo.id;
        this.companyName = companyInfo.company_name;
        this.department = companyInfo.department;
        this.position = companyInfo.position;
    }

    static toViewModel(companyInfo: CompanyInfoType) {
        return {
            id: companyInfo.id,
            companyName: companyInfo.company_name,
            department: companyInfo.department,
            position: companyInfo.position
        };
    }
}

export default CompanyInfoViewModel;