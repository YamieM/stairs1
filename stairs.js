const makeCategoriesArray = (data) => {
  const categoriesArray = data.reduce(function (subCategory, item) {
    return subCategory.concat(item.subCategories);
  }, []);
  console.log(categoriesArray);
};
const runArray = (data) => {
  let pubArray = [];
  if (Array.isArray(data)) {
    pubArray = data.reduce(function (array, element) {
      return array.concat(element.publishedAt);
    }, []);
    return pubArray;
  } else if (data !== null) {
    return pubArray.concat(data.publishedAt);
  }
};

function makePublishedArray(data) {
  const publishedArray = data.reduce(function (array, item) {
    return array.concat(
      item.publishedAt,
      runArray(item.products),
      runArray(item.subCategories),
      runArray(item.parentCategory)
    );
  }, []);
  let filter = publishedArray.filter((element) => !!element);
  filter.sort((a, b) => Date.parse(a) - Date.parse(b));
  console.log(filter);
}

const priceSum = (data) => {
  let pricesArray = [];
  const priceArray = data.reduce(function (array, item) {
    const price = item.products.reduce(function (array, item) {
      if (!!item.price) {
        return pricesArray.push(item.price);
      }
    }, []);
  }, []);  
  let priceSum=pricesArray.reduce((sum,cur)=>{
    return sum + cur;    
  },0)
  console.log(priceSum);  
};

const makeObjectsArray = (data) => {
  //   let objectsArray=[];
  //   const stairsArray = data;
  //   stairsArray.forEach((element) => {
  //     const id = element.subCategories.id;
  //     const name = element.subCategories.name;
  //     let subCategoriesArray = [];
  //     element.subCategories.forEach((element) => {
  //       const id = element.id;
  //       const name = element.name;
  //       subCategoriesArray.push({id,name});
  //     });
  //     const object = {
  //       name: element.name,
  //       subCategories: subCategoriesArray,
  //     };
  //     objectsArray.push(object);
  // });
  // console.log(objectsArray);
};

const stairsArray = fetch(
  "https://run.mocky.io/v3/c35ef044-e20d-4119-bfcc-421802d71a1e"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    makeCategoriesArray(data);
    makePublishedArray(data);
    priceSum(data);
    makeObjectsArray(data);
  });
