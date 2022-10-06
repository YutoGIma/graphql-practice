// Import the required libraries
// 必要なライブラリをインポートする
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql').graphqlHTTP;
var express = require('express');

// Import the data you created above
// 上で作成したデータをインポートする
var data = require('./data.json').user;
var data2 = require('./data.json').book;

// Define the User type with two string fields: `id` and `name`.
// The type of User is GraphQLObjectType, which has child fields
// with their own types (in this case, GraphQLString).
// 2つの文字列フィールド（`id`と`name`）を持ったUser型を定義します。
// Userの型は、自分の型（今回の場合はGraphQLString）を持つ子フィールドを
// 持ったGraphQLObjectTypeとなります。
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});
var bookType = new graphql.GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

// Define the schema with one top-level field, `user`, that
// takes an `id` argument and returns the User with that ID.
// Note that the `query` is a GraphQLObjectType, just like User.
// The `user` field, however, is a userType, which we defined above.
// ひとつのtop-levelのフィールド`user`を持ったスキーマを定義します。
// それは引数`id`を取り、そのIDを持ったUserを返します。
// `query`はUserと同じようにGraphQLObjectTypeとなることに注意してください。
// しかしながら`user`フィールドは、上で定義したuserTypeとなります。
var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        // `args` describes the arguments that the `user` query accepts
        // `args`は`user`クエリが許可する引数を記述します。
        args: {
          id: { type: graphql.GraphQLString }
        },
        // The resolve function describes how to "resolve" or fulfill
        // the incoming query.
        // In this case we use the `id` argument from above as a key
        // to get the User from `data`
        // resolve関数は受け取ったクエリの解決方法
        // または実行方法を記述します。
        // 今回は、`data`からUserをゲットするために、
        // keyとして上記の引数`id`を使います。
        resolve: function (_, args) {
          return data[args.id];
        }
      },
      book: {
        type: bookType,
        // `args` describes the arguments that the `user` query accepts
        // `args`は`user`クエリが許可する引数を記述します。
        args: {
          id: { type: graphql.GraphQLString }
        },
        // The resolve function describes how to "resolve" or fulfill
        // the incoming query.
        // In this case we use the `id` argument from above as a key
        // to get the User from `data`
        // resolve関数は受け取ったクエリの解決方法
        // または実行方法を記述します。
        // 今回は、`data`からUserをゲットするために、
        // keyとして上記の引数`id`を使います。
        resolve: function (_, args) {
          return data2[args.id];
        }
      }
    }
  })
});

express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3002);

console.log('GraphQL server running on http://localhost:3002/graphql');