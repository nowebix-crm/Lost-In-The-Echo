import AddressInfoModel from "../models/address-info";

class AddressInfoRepo {
    static async create(addressInfo: any) {
        const newAddressInfo = await AddressInfoModel.create(addressInfo);
        return newAddressInfo;
    }

    static async findByUserId(userId: string) {
        const addressInfo = await AddressInfoModel.findOne({ where: { user_id: userId } });
        return addressInfo;
    }

    static async updateByUserId(userId: string, addressInfo: any) {
        const [updatedRowsCount] = await AddressInfoModel.update(addressInfo, { 
            where: { user_id: userId } 
        });
        return updatedRowsCount > 0;
    }
}

export default AddressInfoRepo;
