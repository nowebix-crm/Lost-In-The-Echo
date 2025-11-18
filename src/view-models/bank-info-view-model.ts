import { BankInfoType } from "../constants/users-contstants";

class BankInfoViewModel {
    declare id: string;
    declare cardNumber?: string | undefined;
    declare expiryDate?: string | undefined;
    declare currency?: string | undefined;

    constructor(private bankInfo: BankInfoType) {
        this.id = bankInfo.id;
        this.cardNumber = bankInfo.card_number;
        this.expiryDate = bankInfo.expiry_date;
        this.currency = bankInfo.currency;
    }

    static toViewModel(bankInfo: BankInfoType) {
        return {
            id: bankInfo.id,
            cardNumber: bankInfo.card_number,
            expiryDate: bankInfo.expiry_date,
            currency: bankInfo.currency,
        };
    }
}

export default BankInfoViewModel;