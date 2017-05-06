function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function genCharArray(charA, charZ) {
    let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

function seeder(a,b,...arr){
    let res="",mainArr=[],rand=getRandomArbitrary(a,b),length;
    mainArr=mainArr.concat(...arr);
    length=mainArr.length-1;
    for (let i=0;i<rand;i++ ){
        res+=mainArr[getRandomArbitrary(0,length)];
    }
    return res;
}

const arrLowerLetters=genCharArray('a', 'z'),
    arrUpperLetters=genCharArray('A', 'Z'),
    arrNums=genCharArray('0', '9'),
    domains=['org','com','ru','net','by'];

 function userSeed(){
        return {
            email:seeder(3,12,arrLowerLetters,arrNums)+'@'+seeder(2,7,arrLowerLetters)+'.'+seeder(1,1,domains),
            pass:seeder(4,12,arrLowerLetters,arrUpperLetters,arrNums)
        }
    }

export default userSeed;