/**
 * end to end cypress test
 */
/// <reference types="Cypress" />

// CYPRESS_INSTALL_BINARY_TEMPLATE=https://artifactory.some.internal.domain/npm-packages/cypress/__VERSION__/cypress___PLATFORM__-__ARCH__.zip

// ELECTRON_RUN_AS_NODE=1 ENVIRONMENT=test cypress run --config-file cypress-listings.json --spec cypress/integration/listings.spec.ts --browser chrome
