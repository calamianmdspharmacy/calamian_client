import React from 'react'
import { ApolloClient, ApolloProvider, gql, HttpLink, InMemoryCache, makeVar, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
export const carrItemsVar = makeVar([])

export const GET_CARTITEMS = gql`
query CartDetails {
    cartItems @client  {
        itemsID 
        items
        price
        quantity
        total
}
}`

const httpLink = new HttpLink({
    uri: "https://calamian-522af75126ee.herokuapp.com/graphql",

})



const webSocketLink = typeof window !== "undefined" ? new GraphQLWsLink(createClient({
    url: "wss://calamian-522af75126ee.herokuapp.com/graphql"
})) : null



const splitLink = typeof window !== "undefined" && webSocketLink !== null ? split(({ query }) => {
    const definition = getMainDefinition(query)
    return (
        definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    )
}, webSocketLink, httpLink) : httpLink

export const client = new ApolloClient({
    link: splitLink,
    credentials: "include",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    cartItems: {
                        read() {
                            return carrItemsVar()
                        }
                    }
                }
            },
        }
    })
})



export default function ApolloWrapper({ children }: { children: React.ReactNode }) {



    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}
