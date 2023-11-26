import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger';
import { serviceInfo, liveness, readiness, metrics } from '../controllers';

const maintenance = Router();

maintenance.get('/healthcheck/liveness', liveness);
maintenance.get('/healthcheck/readiness', readiness);

maintenance.get('/metrics', metrics);

maintenance.use('/open-api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

maintenance.use('/', serviceInfo);

export { maintenance };
