import type { AddressInfoType } from "../constants/users-contstants";

class AddressInfoViewModel {
    declare id: string;
    declare country?: string | undefined;
    declare city?: string | undefined;
    declare zip?: string | undefined;
    declare address?: string | undefined;
    declare state?: string | undefined;

    constructor(private addressInfo: AddressInfoType) {
        this.id = addressInfo.id;
        this.country = addressInfo.country;
        this.city = addressInfo.city;
        this.zip = addressInfo.zip;
        this.address = addressInfo.address;
        this.state = addressInfo.state;
    }

    static toViewModel(addressInfo: AddressInfoType) {
        return {
            id: addressInfo.id,
            country: addressInfo.country,
            city: addressInfo.city,
            zip: addressInfo.zip,
            address: addressInfo.address,
            state: addressInfo.state
        };
    }
}

export default AddressInfoViewModel;