// import Nzdata from '../Models/CovidNzData.model'
// export async function ManageDb(caseResult){
//     const record = {
//         totalcases:caseResult
//     }
//     const result = await Nzdata.findOne(record)
    
//     if(result){
//         console.log(caseResult, 'exist')
//     } else {
//         console.log(caseResult, 'does not exist')
//     }
    
// }

// export async function SavetoDb(caseResult){
    
//     const savedata = new Nzdata({totalcases: caseResult, date: Date.now()})
//     return savedata.save()
// }

// export async function UpdateDb(caseResult){
//     const updatedata = Nzdata.findByIdAndUpdate
// }



