export default function validateListing(address, slots, price){
    let errors = {}
    if(address == "" || address.match(/^ *$/) !== null){
        errors.address = "Address can't be empty"
    }
    if(slots == null || slots <= 0) {
        errors.slots = "Atleast 1 slot required"
    }
    if(price == null || price <= 0){
        errors.price = "Enter a valid price"
    }

    return errors;
}