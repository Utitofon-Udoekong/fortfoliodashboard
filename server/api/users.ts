// const {$db} = useNuxtApp()

// export default async (_: any,res: any) => {
//     let users: any[]
   
//     $db.collection("authUsers").onSnapshot((querysnapshot) => {
//         if(querysnapshot.empty) return "No snapshot found for investments"
//         else {
//             users = querysnapshot.docs.map(doc => {
//                 return {
//                     uid: doc.id,
//                     ...doc.data()
//                 }
//             })
//         }
//     })
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     res.write(JSON.stringify(users))
//     res.end()
// }