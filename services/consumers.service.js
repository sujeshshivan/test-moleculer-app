"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");
const Cuid = require("cuid");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
// console.log("process.env.POSTGRESQL_HOST ################# ", process.env.POSTGRESQL_HOST);
// console.log("process.env.POSTGRESQL_DATABASE ################# ", process.env.POSTGRESQL_DATABASE);
// console.log("process.env.POSTGRESQL_USER ################# ", process.env.POSTGRESQL_USER);
// console.log("process.env.POSTGRESQL_PASSWORD ################# ", process.env.POSTGRESQL_PASSWORD);


module.exports = {
	name: "db.consumers",

	version: 1,

	mixins: [DbService],

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],
	// adapter: new SqlAdapter(
	// 	process.env.POSTGRESQL_DATABASE_CONNECTION_STRING,
	// 	{
	// 		logging: false
	// 	}
	// ),

	adapter: new SqlAdapter(process.env.POSTGRESQL_DATABASE, process.env.POSTGRESQL_USER, process.env.POSTGRESQL_PASSWORD, {
		host: process.env.POSTGRESQL_HOST,
		dialect: 'postgres',
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},
	}),

	model: {
		name: "consumers",
		define: {
			consumerId: {
				type: Sequelize.STRING,
				primaryKey: true,
				defaultValue: () => {
					return Cuid();
				}
			},
			name: {
				field: "name",
				type: Sequelize.STRING
			},
			email: {
				field: "email",
				type: Sequelize.STRING
			},
			phoneNumber: {
				field: "phoneNumber",
				type: Sequelize.STRING,
			},
			deletedAt: {
				field: "deleted_at",
				type: "TIMESTAMP WITH TIME ZONE"
			},
			createdAt: {
				field: "created_at",
				type: "TIMESTAMP WITH TIME ZONE"
			},
			updatedAt: {
				field: "updated_at",
				type: "TIMESTAMP WITH TIME ZONE"
			}
		},
		options: {
			// Options from http://docs.sequelizejs.com/manual/tutorial/models-definition.html
		}
	},

	hooks: {
		before: {
			create: [
				function addTimestamp(ctx) {
					ctx.params.createdAt = new Date();
					ctx.params.updatedAt = ctx.params.createdAt;
					return ctx;
				}
			],
			update: [
				function updateTimestamp(ctx) {
					ctx.params.updatedAt = new Date();
					return ctx;
				}
			]
		}
	},


	/**
	 * Actions
	 */
	actions: {},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	},


	async afterConnected() {
		if (true) {
			this.adapter.db.sync({ alter: true }).then(function () { });
		}
	}
};
