const makeCategoriesArray = (data) =>
  data.reduce((acc, { subCategories, parentCategory }) => {
    if (subCategories.length) {
      acc = [...acc, ...subCategories];
    }
    if (parentCategory) {
      acc = [...acc, ...parentCategory.subCategories];
    }

    return acc;
  }, []);

// const makeCategoriesArray = (data) => {
//   let subsArray = [];
//   const subCategoriesArray = data.map(({ subCategories}) => (subCategories));
//   const parentCategorySubsArray = data.map(({parentCategory})=>{
//     if(parentCategory){
//      return parentCategory.subCategories;
//     }    
//   });
//   const filter = parentCategorySubsArray.filter((elem)=>!!elem);
//   return subsArray.concat(...subCategoriesArray, ...filter);
// };

const publishedAtArray = (data) =>
  data.reduce(
    (acc, { publishedAt, subCategories, parentCategory, products }) => {
      if (publishedAt) {
        acc = [...acc, publishedAt];
      }
      if (parentCategory) {
        acc = [...acc, parentCategory.publishedAt];
      }
      acc = [...acc, ...publishedAtArray(subCategories)];
      const filteredProductsPublishedAt = products.filter(
        (elem) => !!elem.publishedAt
      );
      const newArr = [...filteredProductsPublishedAt].map(
        (elem) => elem.publishedAt
      );
      acc = [...acc, ...newArr];
      return acc;
    },
    []
  );

const sortedDate = (data) => {
  const dateArr = publishedAtArray(data);
  const sorted = dateArr.sort((a, b) => Date.parse(a) - Date.parse(b));
  return sorted;
};

const takeAllTreePrice = (data) =>
  data.reduce((acc, { price }) => {
    if (price) {
      acc += price;
    }
    return acc;
  }, 0);

const priceSum = (data) =>
  data.reduce((acc, item) => {
    if (item.products.length) {
      acc += takeAllTreePrice(item.products);
    }
    if (item.subCategories.length) {
      acc += priceSum(item.subCategories);
    }
    return acc;
  }, 0);

const makeSubsObject = (data) => {
  const array = data.map(({ id, name }) => ({ id, name }));
  return array;
};
const makeObjectsArray = (data) => {
  let objectArray = [];
  const dataArr = data.reduce((acc, item) => {
    const subCategories = makeSubsObject(item.subCategories);
    const object = {
      name: item.name,
      subCategories,
    };
    return (objectArray = [...objectArray, object]);
  }, []);
  return objectArray;
};

const stairsArray = fetch(
  "https://run.mocky.io/v3/c35ef044-e20d-4119-bfcc-421802d71a1e"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    console.log(makeCategoriesArray(data));
    console.log(sortedDate(data));
    console.log(priceSum(data));
    console.log(makeObjectsArray(data));
  });
