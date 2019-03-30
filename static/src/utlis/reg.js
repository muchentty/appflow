
const registrue=function(str){
    return !!str
}
const resisrole=function(str,type){
  let telreg = /^(?:[-+]?([0-9]\d*))$/
  return telreg.test(str)

}
function inoutreg(list){
    let name = registrue(list.name);
    let carnum = registrue(list.carnum);
    let data = registrue(list.data)
    let time = registrue(list.time)
    let organization = registrue(list.organization)
    let picUrl = registrue(list.imageUrl);
    let tel = resisrole(list.tel);
    let numlist = true
    list.numlist.map((item)=>{
        if(!registrue(item.name)||!registrue(item.spec)){
            numlist=false
        }
    })
    return (name&&carnum&&data&&time&&organization&&picUrl&&tel&&numlist)

}
function firereg(list){
     let applicant=registrue(list.applicant);
     let teams=registrue(list.teams);
     let part=registrue(list.part);
     let type=registrue(list.type);
     let beginTime=registrue(list.beginTime);
     let endTime=registrue(list.endTime);
     let remark=registrue(list.remark);
     let guardian=registrue(list.guardian);
     let proposer=registrue(list.proposer);
     let begindata=registrue(list.begindata);
     let enddata=registrue(list.enddata);
     let level=registrue(list.level);
    return (applicant&&teams&&part&&type&&beginTime&&endTime&&remark&&guardian&&proposer&&begindata&&enddata&&level)
}
function addPersion(list){
    let userName=registrue(list.userName);
    let phoneNumber=resisrole(list.phoneNumber);
    let passwd=registrue(list.passwd);
    return (userName&&phoneNumber&&passwd)
}


export  {inoutreg,firereg,addPersion}