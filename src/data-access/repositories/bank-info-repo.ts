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
        const [updatedRowsCount] = await BankInfoModel.update(bankInfo, { 
            where: { user_id: userId } 
        });
        return updatedRowsCount > 0;
    }
}

export default BankInfoRepo;
