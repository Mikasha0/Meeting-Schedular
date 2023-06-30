export function getMeetingFormData(form:FormData){
    return{
        name:form.get("name") as string,
        email:form.get("email") as string,
        location:form.get("location") as string,
    }
}