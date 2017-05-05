export default  (func, ...data)=>
    new Promise((resolve, reject)=>{func(...data)
        .then((response)=>{
            resolve( response.data) })});
