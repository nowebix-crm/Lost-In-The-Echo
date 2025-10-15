import CompanyInfoModel from "../models/company-info";

class CompanyInfoRepo {
    static async create(companyInfo: any) {
        const newCompanyInfo = await CompanyInfoModel.create(companyInfo);
        return newCompanyInfo;
    }

    static async findByUserId(userId: string) {
        const companyInfo = await CompanyInfoModel.findOne({ where: { user_id: userId } });
        return companyInfo;
    }

    static async updateByUserId(userId: string, companyInfo: any) {
        const [updatedRowsCount] = await CompanyInfoModel.update(companyInfo, { 
            where: { user_id: userId } 
        });
        return updatedRowsCount > 0;
    }
}

export default CompanyInfoRepo;
