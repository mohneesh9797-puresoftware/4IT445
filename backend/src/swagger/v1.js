import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
	openapi: '3.0.0',
	swaggerDefinition: {
		components: {},
		info: {
			title: 'Test API',
			version: '1.0.0',
			description: 'Test Express API with autogenerated swagger doc',
		},
		basePath: '/api/v1'
	},
	// List of files to be processes. You can also set globs './routes/*.js'
	apis: ['./src/v*/*.js'],
};
const specs = swaggerJsdoc(options);

const options_ui = {
	explorer: true
}
const v1 = (app) => {
	app.use('/docs/v1', swaggerUi.serve, swaggerUi.setup(specs, options_ui));
};

export default v1;