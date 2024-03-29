import { gql } from "@apollo/client";


export const GetAllItemQuery = gql`query Query {
  getAllStoreItems {
    itemsID
    items
    dosage
    itemsID
    storeInfo {
      price
      quantity
    }
    category {
      category
    }
  }
}`

export const getSearchItems = gql`query GetItemBySearch($search: ID!, $categoryId: ID!) {
  getItemBySearch(search: $search, categoryID: $categoryId) {
    dosage
    items
    itemsID
    storeInfo {
      price
      quantity
      expiredDate
    }
  }
}
`
export const getSearchStaff = gql`query GetItemsByStaff($search: String!) {
  getItemsByStaff(search: $search) {
    items
    itemsID
    dosage
    category {
      categoryID
      category
    }
    storeInfo {
      price
      quantity
      expiredDate
    }
  }
}`

export const GetTotalOfNumberItems = gql`query Query {
  getTotalNoOfItems
}`


export const getItemByCategoryid = gql`query GetItemsByCategoryId($categoryId: ID!) {
  getItemsByCategoryId(categoryID: $categoryId) {
    itemsID
    items
    dosage
    storeInfo {
      price
      quantity
      expiredDate
    }
  }
}`