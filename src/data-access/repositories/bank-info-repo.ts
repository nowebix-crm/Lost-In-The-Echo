import BankInfoModel from "../models/bank-info";

class BankInfoRepo {
    static async create(bankInfo: any) {
        const newBankInfo = await BankInfoModel.create(bankInfo);
        
        return newBankInfo;
    }

    static async findByUserId(userId: string) {
        const bankInfo = await BankInfoModel.findOne({ where: { user_id: userId } });
        
        return bankInfo;
    }

    static async updateByUserId(userId: string, bankInfo: any) {
        const updatedBankInfo = await BankInfoModel.update(bankInfo, { 
            where: { user_id: userId },
            returning: true
        });

        return updatedBankInfo;
    }
}

export default BankInfoRepo;
