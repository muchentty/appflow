function loginfailed(){
    let role =  sessionStorage.getItem("userType");
    if(!role){
        window.location.href="/login"
    }

}
export {loginfailed}