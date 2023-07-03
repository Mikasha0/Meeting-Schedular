export function getMeetingFormData(form:FormData){
    return{
        name:form.get("name") as string,
        email:form.get("email") as string,
        location:form.get("location") as string,
        notes:form.get("notes") as string, 
        guests:form.get("guest-email") as string
    }
}