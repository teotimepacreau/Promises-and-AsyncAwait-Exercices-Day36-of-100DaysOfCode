console.log('connecté')
// https://github.com/Asabeneh/30-Days-Of-JavaScript/blob/master/18_Day_Promises/18_day_promises.md

const areThereSkills = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    const skills=['HTML','CSS','JS']
    if(skills.length > 0){
      resolve('frontDev')
    }else{
      reject('Something wrong has happened')
    }
  },2000)
})
areThereSkills
  .then(result=>{
    console.log(result)
  })
  .catch(error=>console.error(error))

//fetch en mode promise
const url = 'https://restcountries.com/v2/all'
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error=>console.error(error))

//fetch en mode async await
const fetchData = async () =>{
  try {//correspond au bloc resolve
    const response = await fetch(url)
    const countries = await response.json()
    console.log(countries)
  }catch(err){//correspond au bloc reject
    console.error(err) 
  }
}
fetchData()


// I.1  Read the countries API using fetch and print the name of country, capital, languages, population and area.
const countriesAPI = 'https://restcountries.com/v2/all'
const catsAPI = 'https://api.thecatapi.com/v1/breeds'

const fetchCountries = async ()=>{
  try{
    const response = await fetch(countriesAPI)
    const countriesObject = await response.json()
    console.log('countriesObject',countriesObject)
    const extractedData = []
    for (const country of countriesObject) {
      const { name, capital, population, languages, area } = country;
      extractedData.push({ name, capital, population, languages, area });
    }
    console.log('extractedData',extractedData)
  }catch(err){
    console.error(err)}
}

fetchCountries()

// II.1 Print out all the cat names in to catNames variable.
const fetchCats = async () => {
  try {
    const response = await fetch(catsAPI);
    const catsObject = await response.json();
    console.log('catsObject', catsObject);
    const catNames = [];
    for (let cat of catsObject) {
      catNames.push(cat.name);
    }
    console.log('catNames', catNames);
    return catsObject;
  } catch (err) {
    console.error(err);
  }
};
// III.1  Read the cats api and find the average weight of all cats in metric unit.
(async () => {//IIFE
  try{
  const catsData = await fetchCats();
  console.log('catsData',catsData);
  const allWeightsRaw=[]
  for(let {weight} of catsData){
    allWeightsRaw.push(weight.metric)
  }
  console.log('allWeights',allWeightsRaw)
  const allWeightsNumbered = []
  for(let item of allWeightsRaw){
    allWeightsNumbered
    .push(
      item.split('-')
          .map((number)=>parseInt(number))
          .reduce((acc, curr)=>{
            return acc+curr/2
          }, 0)
    )
  }
  console.log('allWeightsNumbered',allWeightsNumbered)
  const averageWeightofCats = allWeightsNumbered.reduce((acc, curr)=>{
    return acc + curr / allWeightsNumbered.length
  },0).toFixed(2)
  console.log(averageWeightofCats, 'kg')
  }catch(err){
    console.error(err) }
})();

