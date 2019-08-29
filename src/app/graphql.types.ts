export type Maybe<T> = T | null;

export interface BatchSettleEquityRowInput {
  isin: string;

  settlementPrice: Decimal;

  closingPrice: Decimal;

  marginClosingPrice: Decimal;
}

export interface BatchSettleIndexRowInput {
  isin: string;

  settlementPrice: Decimal;

  closingPrice: Decimal;

  marginClosingPrice: Decimal;
}

export interface BatchSettleFuturesRowInput {
  productId: string;

  expiration: YearMonth;

  settlementPrice: Decimal;
}
/** Defines type of the derivative instrument e.g. Future, Option, ... */
export enum ProductLine {
  Option = "OPTION",
  Futures = "FUTURES"
}

export enum DerivativeInstrumentStatus {
  All = "ALL",
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Removed = "REMOVED",
  Deleted = "DELETED"
}
/** Defines type of cash instrument e.g. Equity, Index, Bond, ... */
export enum CashGroupingLine {
  Equity = "EQUITY",
  Index = "INDEX"
}
/** Determines if an option is CALL or PUT type */
export enum CallPut {
  Call = "CALL",
  Put = "PUT"
}

export enum ApprovalState {
  Created = "CREATED",
  Approved = "APPROVED"
}
/** Exercise style of an option */
export enum ExerciseStyle {
  American = "AMERICAN",
  European = "EUROPEAN"
}

/** ISO 8601 date: YYYY-MM-DD, e.g. 2018-09-13. Local market date */
export type Date = any;

/** Arbitrary-precision signed decimal number formatted as (-)%d.%f, e.g. -3.15 */
export type Decimal = any;

/** ISO 4217-like currency code consisting of three capital letters. Does not actually correspond to ISO 4217 enumerations. Our reference data contains additional non ISO4217 compliant GBX currency which represents penny sterling (stock exchange usage, https://en.wikipedia.org/wiki/Penny_sterling) and obsolete DEM currency */
export type Currency = any;

/** ISO 8601 time: hh:mm:ss.nnnnnn+|-hh:mm, e.g. 15:53:00+05:00 */
export type Time = any;

/** ISO 8601 Date without the day of month formatted as YYYY-MM, e.g. 2018-09. */
export type YearMonth = any;

/** ISO 8601 time: yyyy-mm-ddThh:mm:ss.nnnnnn+|-hh:mm, e.g. 2008-09-15T15:53:00+05:00 */
export type DateTime = any;

/** RFC 4648 Base64-encoded binary data */
export type Binary = any;

export type Uuid = any;

/** International Security Identificaion Number of the instrument e.g.LU0569974404. See details on https://en.wikipedia.org/wiki/International_Securities_Identification_Number */
export type Isin = any;

// ====================================================
// Documents
// ====================================================

export namespace AllProductsQuery {
  export type Variables = {
    date: Date;
  };

  export type Query = {
    __typename?: "Query";

    productTypes: ProductTypes[];
  };

  export type ProductTypes = {
    __typename?: "ProductType";

    line: ProductLine;

    products: Products;
  };

  export type Products = {
    __typename?: "DerivativeProductConnection";

    edges: Maybe<(Maybe<Edges>)[]>;
  };

  export type Edges = {
    __typename?: "DerivativeProductConnectionEdge";

    node: Maybe<Node>;
  };

  export type Node = {
    __typename?: "DerivativeProduct";

    productId: string;
  };
}

export namespace AllProfilesQuery {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    profiles: Profiles[];
  };

  export type Profiles = {
    __typename?: "Profile";

    profileId: number;

    name: string;
  };
}

export namespace BusinessDate {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    currentBusinessDate: Date;
  };
}

export namespace ProductsQuery {
  export type Variables = {
    date: Date;
    productLine: ProductLine;
    productType: string;
  };

  export type Query = {
    __typename?: "Query";

    productsForType: ProductsForType[];
  };

  export type ProductsForType = {
    __typename?: "DerivativeProduct";

    productId: string;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class AllProductsQueryGQL extends Apollo.Query<
  AllProductsQuery.Query,
  AllProductsQuery.Variables
> {
  document: any = gql`
    query allProductsQuery($date: Date!) {
      productTypes(businessDate: $date) {
        line
        products(first: 99) {
          edges {
            node {
              productId
            }
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AllProfilesQueryGQL extends Apollo.Query<
  AllProfilesQuery.Query,
  AllProfilesQuery.Variables
> {
  document: any = gql`
    query allProfilesQuery {
      profiles {
        profileId
        name
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class BusinessDateGQL extends Apollo.Query<
  BusinessDate.Query,
  BusinessDate.Variables
> {
  document: any = gql`
    query businessDate {
      currentBusinessDate
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class ProductsQueryGQL extends Apollo.Query<
  ProductsQuery.Query,
  ProductsQuery.Variables
> {
  document: any = gql`
    query productsQuery(
      $date: Date!
      $productLine: ProductLine!
      $productType: String!
    ) {
      productsForType(
        businessDate: $date
        productLine: $productLine
        productType: $productType
      ) {
        productId
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
