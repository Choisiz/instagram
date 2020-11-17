import path from "path";
import {makeExecutableSchema} from "apollo-server";
import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";
import {loadFilesSync} from "@graphql-tools/load-files";

const allTypes = loadFilesSync(path.join(__dirname,"/api/**/*.graphql"));//모든경로 .graphql
const allResolvers =loadFilesSync(path.join(__dirname,"/api/**/*.js")); //모든경로 .js

const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;