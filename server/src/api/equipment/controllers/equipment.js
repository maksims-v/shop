"use strict";

/**
 * equipment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::equipment.equipment",
  ({ strapi }) => ({
    async search(ctx) {
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const {
        sale,
        brands,
        category,
        subcat,
        size,
        search,
        pmin,
        pmax,
        currentPage,
        sorting,
      } = sanitizedQueryParams;

      console.log(subcat);

      let howToSort = sorting;

      if (sorting == "Sort By") {
        howToSort = false;
      } else if (sorting == "Latest arrivals") {
        howToSort = false;
      } else if (sorting == "Price asc.") {
        howToSort = "asc";
      } else if (sorting == "Price desc.") {
        howToSort = "desc";
      }

      // pagination logic
      let startPage = 0;
      let limitPage = 21 * currentPage;
      if (currentPage > 1) {
        startPage = limitPage - 21;
      } else {
        startPage = 0;
      }

      //---------------

      const searchItem = search ? search : "";
      const salesSplitToArr = sale ? sale.split(",") : [];
      const brandsSplitToArr = brands ? brands.split(",") : [];
      const categorySplitToArr = category ? category.split(",") : [];
      const subCategoryArr = subcat ? subcat.split(",") : [];

      console.log(subCategoryArr);

      let sizeArr = [];
      if (
        size === "false" ||
        size === "undefined" ||
        size == undefined ||
        size === ""
      ) {
        sizeArr = [];
      } else {
        sizeArr = size.split(",");
      }
      // sizeArr = size ? size.split(",") : [];

      let priceMin = pmin ? pmin : 0;
      let priceMax = pmax ? pmax : 9999;

      // "sale" on/off
      let saleItem = false;
      salesSplitToArr.map((item) => {
        if (item == "Sale") {
          saleItem = !saleItem;
        }
      });
      //---------------

      const products = await strapi.entityService.findMany(
        "api::equipment.equipment",
        {
          start: startPage,
          limit: 21,
          sort: howToSort ? [{ price: howToSort }] : { id: "desc" },
          filters: {
            publishedAt: {
              $null: null,
            },
            $and: [
              {
                $or: [{ title: { $startsWith: searchItem } }],
              },
              {
                $or: [{ price: { $between: [priceMin, priceMax] } }],
              },
              {
                brand: {
                  $eqi: brandsSplitToArr,
                },
              },
              {
                category: {
                  $eqi: categorySplitToArr,
                },
              },
              {
                $or: [
                  { lampsLanternsCategory: { $eqi: subCategoryArr } },
                  { campSleepCategory: { $eqi: subCategoryArr } },
                  { toolsGearCategory: { $eqi: subCategoryArr } },
                  { otherCategory: { $eqi: subCategoryArr } },
                ],
              },
              {
                $or: [
                  { sale: saleItem ? true : true },
                  { sale: saleItem ? true : false },
                ],
              },
              {
                size: {
                  size: {
                    $eqi: sizeArr,
                  },
                },
              },
            ],
          },
          populate: {
            image: true,
            size: true,
          },
        }
      );

      const pagination = await strapi.entityService.findMany(
        "api::equipment.equipment",
        {
          filters: {
            publishedAt: {
              $null: null,
            },
            $and: [
              {
                $or: [{ title: { $startsWith: searchItem } }],
              },
              {
                $or: [{ price: { $between: [priceMin, priceMax] } }],
              },
              {
                brand: {
                  $eqi: brandsSplitToArr,
                },
              },
              {
                category: {
                  $eqi: categorySplitToArr,
                },
              },
              {
                $or: [
                  { lampsLanternsCategory: { $eqi: subCategoryArr } },
                  { campSleepCategory: { $eqi: subCategoryArr } },
                  { toolsGearCategory: { $eqi: subCategoryArr } },
                  { otherCategory: { $eqi: subCategoryArr } },
                ],
              },
              {
                $or: [
                  { sale: saleItem ? true : true },
                  { sale: saleItem ? true : false },
                ],
              },
              {
                size: {
                  size: {
                    $eqi: sizeArr,
                  },
                },
              },
            ],
          },
          populate: { size: true },
        }
      );

      // get Min, Max price
      if (products.length !== 0) {
        const minMaxPriceArr = pagination?.map((item) => {
          return item.price;
        });

        priceMin = Math.min.apply(null, minMaxPriceArr);
        priceMax = Math.max.apply(null, minMaxPriceArr);
      }
      //---------------

      // get all products count
      const paginationLength = pagination.length;
      //---------------

      // get pages count
      const pages = Math.ceil(paginationLength / 21);
      //---------------

      // get category
      const allCategory = pagination.map((item) => {
        return item.category.toLowerCase();
      });
      const getUniqCategory = allCategory.filter(
        (item, id) => allCategory.indexOf(item) === id
      );
      //---------------

      // get subCategory

      let conCatSubCategory = [];

      const allLampsLanternsSubCategory = pagination.map((item) => {
        return item.lampsLanternsCategory.toLowerCase();
      });
      const getUniqLampsLanternsSubCategory =
        allLampsLanternsSubCategory.filter(
          (item, id) => allLampsLanternsSubCategory.indexOf(item) === id
        );

      const allCampSleepSubCategory = pagination.map((item) => {
        return item.campSleepCategory.toLowerCase();
      });
      const getUniqCampSleepSubCategory = allCampSleepSubCategory.filter(
        (item, id) => allCampSleepSubCategory.indexOf(item) === id
      );

      const allToolsGearSubCategory = pagination.map((item) => {
        return item.toolsGearCategory.toLowerCase();
      });
      const getUniqToolsGearSubCategory = allToolsGearSubCategory.filter(
        (item, id) => allToolsGearSubCategory.indexOf(item) === id
      );

      const allOtherSubCategory = pagination.map((item) => {
        return item.otherCategory.toLowerCase();
      });
      const getUniqOtherSubCategory = allOtherSubCategory.filter(
        (item, id) => allOtherSubCategory.indexOf(item) === id
      );
      console.log(getUniqLampsLanternsSubCategory);
      console.log(getUniqCampSleepSubCategory);
      console.log(getUniqToolsGearSubCategory);
      console.log(getUniqOtherSubCategory);

      conCatSubCategory = [
        ...getUniqLampsLanternsSubCategory,
        ...getUniqCampSleepSubCategory,
        ...getUniqToolsGearSubCategory,
        ...getUniqOtherSubCategory,
      ];

      const removeNullFromSubCategoryArr = conCatSubCategory.filter((item) => {
        if (item !== "null") return item;
      });
      console.log(removeNullFromSubCategoryArr);
      //---------------

      // get brands
      const allBrands = pagination.map((item) => {
        return item.brand.toLowerCase();
      });

      const getUniqBrands = allBrands.filter(
        (item, id) => allBrands.indexOf(item) === id
      );
      //---------------

      // get sizes
      const allSizes = pagination.map((item) => {
        return item.size;
      });
      const sortSizes = allSizes.filter(
        (item, id) => allSizes.indexOf(item) === id
      );

      const filterSizes = sortSizes.map((item) => {
        const sort = item.map((items) => {
          return items.size;
        });
        return sort;
      });

      const filterSizesConcCat = filterSizes.flat(2);
      const getUniqSize = filterSizesConcCat.filter(
        (item, id) => filterSizesConcCat.indexOf(item) === id
      );

      //---------------

      //sortedProductsImages
      const sortedProducts = products.map((item) => ({
        ...item,
        image: item.image[0].formats.medium.url,
      }));

      //---------------

      const sanitizedEntity = await this.sanitizeOutput(
        { sortedProducts },
        ctx
      );
      const sanitizedPagination = await this.sanitizeOutput(
        {
          data: pagination,
          priceMin,
          priceMax,
          total: paginationLength,
          pages,
          category: getUniqCategory,
          subCategory: removeNullFromSubCategoryArr,
          brands: getUniqBrands,
          sizes: getUniqSize,
        },
        ctx
      );

      return this.transformResponse(sanitizedEntity, sanitizedPagination);
    },
  })
);