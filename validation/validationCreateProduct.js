export default function validationCreateAccount(values) {
    let errors = {};
    if(!values.name){
        errors.name = "The name is required";
    }
    if(!values.company){
        errors.company = "The company name is required";
    }
    
    if(!values.url){
        errors.url = "The url is required";
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ){
        errors.url = "Invalid URL";
    }
    if(!values.description){
        errors.description = "Add a description of your product";
    }
    return errors;
}