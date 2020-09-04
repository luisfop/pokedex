export async function getAllPokemon(url) {
  //When we call this function it will return a promise will then resolve with the data that we get back from the api
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      });
  });
}

export async function getPokemon(url){
    return new Promise((resolve,reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
    })
}