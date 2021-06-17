"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "consumerManagement",

	version: 1,

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		hello: {
			rest: {
				method: "GET",
				path: "/hello"
			},
			async handler() {
				return "Hello Moleculer";
			}
		},

		/**
		 * Welcome, a username
		 *
		 * @param {String} name - User name
		 */
		welcome: {
			rest: "/welcome",
			params: {
				name: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				return `Welcome, ${ctx.params.name}`;
			}
		},

		create: {
			rest: "/create",
			params: {
				name: "string",
				email: "string",
				phoneNumber: "string"
			},
			handler(ctx) {
				return ctx.call("v1.db.consumers.create", ctx.params).then(response => {
					return response;
				}).catch(error => {
					console.log("error------------------", error)
					throw error;
				})
			}
		},

		update: {
			rest: "/update",
			params: {
				id: "string",
				name: "string",
				email: "string",
				phoneNumber: "string"
			},
			handler(ctx) {
				return ctx.call("v1.db.consumers.update", ctx.params).then(response => {
					return response;
				}).catch(error => {
					throw error;
				})
			}
		},

		get: {
			rest: "/get",
			params: {
				consumerId: "string"
			},
			handler(ctx) {
				return ctx.call("v1.db.consumers.get", {
					id: ctx.params.consumerId
				}).then(response => {
					return response;
				}).catch(error => {
					throw error;
				})
			}
		},

		list: {
			rest: "/list",
			params: {
				page: { type: "number", optional: true },
				pageSize: { type: "number", optional: true }
			},
			handler(ctx) {
				return ctx.call("v1.db.consumers.list", {
					page: ctx.params.page || 1,
					pageSize: ctx.params.pageSize || 10,
				}).then(response => {
					return response;
				}).catch(error => {
					throw error;
				})
			}
		},


		count: {
			rest: "/count",
			params: {},
			handler(ctx) {
				return ctx.call("v1.db.consumers.count").then(response => {
					return response;
				}).catch(error => {
					throw error;
				})
			}
		},

		remove: {
			rest: "/remove",
			params: {
				consumerId: "string"
			},
			handler(ctx) {
				return ctx.call("v1.db.consumers.remove", {
					id: ctx.params.consumerId
				}).then(response => {
					return response;
				}).catch(error => {
					throw error;
				})
			}
		},

	},

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

	}
};
