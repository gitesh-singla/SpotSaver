export default function validateInput(formData) {
    let errors = {};

    if (formData.name == "" || formData.name.match(/^ *$/) !== null) {
        errors.name = "Name can't be empty"
    }
    if (formData.oldPassword == "" || formData.oldPassword.match(/^ *$/) !== null) {
        errors.oldPassword = "Please enter your password"
    }
    if (formData.phone.match(/^\d+$/) == null) {
        errors.phone = "Enter a valid phone number"
    }
    if (formData.newPassword.length < 8) {
        errors.newPassword = "Password must be atleast 8 characters"
    }
    if (formData.confirmPassword != formData.newPassword) {
        errors.confirmPassword = "Passwords do not match"
    }
    return errors;
}