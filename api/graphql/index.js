import {ApolloServer, gql} from 'apollo-server-micro';
import {MongoClient} from 'mongodb';

const apollo = async (req, res) => {
	const uri = process.env.MONGO_URI;
	const client = await MongoClient.connect(uri, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
	const db = client.db('users-database');
	const users = db.collection('users');

	const typeDefs = gql`
		type User {
			_id: Int
			username: String
			email: String
			password: String
			refreshTokenVersion: Int
		}

		type Query {
			user(email: String): [User]
		}
	`;

	/*
	 * Resolvers define the technique for fetching the types in the
	 * schema.  We'll retrieve books from the "books" array above.
	 */
	const resolvers = {
		Query: {
			user: async(_, {email}) => {
				const dbusers = await users.find({email}).toArray();

				return dbusers;
			},
		},
	};

	/*
	 * In the most basic sense, the ApolloServer can be started
	 * by passing type definitions (typeDefs) and the resolvers
	 * responsible for fetching the data for those types.
	 */
	const server = new ApolloServer({
		typeDefs, resolvers
	});

	const handler = server.createHandler();

	const callback = client.close;

	return handler(req, res, callback);

};

export default apollo;
