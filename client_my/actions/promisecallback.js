export default  (func, ...data)=>
    new Promise((resolve)=>{func(...data)
        .then((response)=>{
            resolve( response.data) })});
