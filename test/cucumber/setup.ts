import { cucumber } from 'gherkin-jest';

import AppWorld from './world';

cucumber.defineCreateWorld(AppWorld);
