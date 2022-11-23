const makeCategoriesArray = (data) => {
  let categoriesArray = [];
  const stairsArray = data;
  console.log(stairsArray);
  stairsArray.forEach((element) => {
    element.subCategories.forEach((element) => {
      categoriesArray.push(element);
    });
  });
  console.log(categoriesArray);
};
const makePublishedArray = (data) => {
  let publishedArray = [];
  const stairsArray = data;
  stairsArray.forEach((element) => {
    publishedArray.push(element.publishedAt);

    if (element.parentCategory !== null) {
      publishedArray.push(element.parentCategory.publishedAt);
    }

    element.subCategories.forEach((element) => {
      if (element.publishedAt !== null) {
        publishedArray.push(element.publishedAt);
      }
    });

    element.products.forEach((element) => {
      if (element.publishedAt !== null) {
        publishedArray.push(element.publishedAt);
        return publishedArray;
      }
    });
  });

  publishedArray.sort((a, b) => Date.parse(a) - Date.parse(b));
  console.log(publishedArray);
};

const priceSum = (data) => {
  let priceArray = [];
  let sumOfPrice;
  const stairsArray = data;
  stairsArray.forEach((element) => {
    element.products.forEach((element) => {
      if (element.price !== null) {
        priceArray.push(element.price);
      }
      sumOfPrice = priceArray.reduce((sum, current) => sum + current, 0);
    });
  });
  console.log(sumOfPrice);
};
const makeObjectsArray = (data) => {
  let objectsArray=[];
  const stairsArray = data;
  stairsArray.forEach((element) => {
    const id = element.subCategories.id;
    const name = element.subCategories.name;
    let subCategoriesArray = [];
    element.subCategories.forEach((element) => {
      const id = element.id;
      const name = element.name;
      subCategoriesArray.push({id,name});
    });

    const object = {
      name: element.name,
      subCategories: subCategoriesArray,
    };
    objectsArray.push(object);
});
console.log(objectsArray);
};

const stairsArray = fetch(
  "https://run.mocky.io/v3/c35ef044-e20d-4119-bfcc-421802d71a1e"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    makeCategoriesArray(data);
    makePublishedArray(data);
    priceSum(data);
    makeObjectsArray(data);
  });
