import { serviceRunner } from './express';
import Postgres from './databases/postgre';

import { postgresOptions } from './config';

Postgres.createConnection(postgresOptions);

serviceRunner();
