/**
 * @module Registry
 * @description Service registry implementation for microservices architecture.
 * Manages service registration, discovery, and health monitoring.
 */

const semver = require("semver");

/**
 * Service registry class for managing microservice instances
 * @class Registry
 * @description Handles service registration, discovery, and automatic cleanup of stale services.
 */
class Registry {
  /**
   * Creates a new Registry instance
   * @constructor
   * @description Initializes an empty service registry with a default timeout of 15 seconds
   */
  constructor() {
    this.services = [];
    this.timeout = 15;
  }

  /**
   * Generates a unique key for a service instance
   * @private
   * @param {string} name - Service name
   * @param {string} version - Service version
   * @param {string} ip - Service IP address
   * @param {number} port - Service port
   * @returns {string} Unique service identifier
   */
  getKey(name, version, ip, port) {
    return name + version + ip + port;
  }

  /**
   * Removes expired services from the registry
   * @private
   * @description Removes services that haven't been updated within the timeout period
   */
  cleanup() {
    const now = Math.floor(new Date() / 1000);
    Object.keys(this.services).forEach((key) => {
      if (this.services[key].timestamp + this.timeout < now) {
        delete this.services[key];
        console.log(`Removed expired service ${key}`);
      }
    });
  }

  /**
   * Retrieves a service instance that matches the specified criteria
   * @param {string} name - Service name to find
   * @param {string} version - Version requirement (supports semver)
   * @returns {Object|null} Matching service instance or null if none found
   * @example
   * // Find a service with version 1.x.x
   * const service = registry.get('catalog-service', '^1.0.0');
   */
  get(name, version) {
    this.cleanup();
    const candidates = Object.values(this.services).filter((service) => {
      return (
        service.name === name && semver.satisfies(service.version, version)
      );
    });
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  /**
   * Registers a new service instance or updates an existing one
   * @param {string} name - Service name
   * @param {string} version - Service version
   * @param {string} ip - Service IP address
   * @param {number} port - Service port
   * @returns {string} Service registration key
   * @example
   * // Register a new service instance
   * const key = registry.register('catalog-service', '1.0.0', '127.0.0.1', 3000);
   */
  register(name, version, ip, port) {
    this.cleanup();
    const key = this.getKey(name, version, ip, port);
    if (!this.services[key]) {
      this.services[key] = {};
      this.services[key].timestamp = Math.floor(new Date() / 1000);

      this.services[key].ip = ip;
      this.services[key].port = port;
      this.services[key].name = name;
      this.services[key].version = version;
      console.log(`Added service ${name}, version ${version} at ${ip}:${port}`);
      return key;
    }
    this.services[key].timestamp = Math.floor(new Date() / 1000);
    console.log(`Updated service ${name}, version${version} at ${ip}:${port}`);
    return key;
  }

  /**
   * Removes a service instance from the registry
   * @param {string} name - Service name
   * @param {string} version - Service version
   * @param {string} ip - Service IP address
   * @param {number} port - Service port
   * @returns {string} Service registration key that was removed
   * @example
   * // Unregister a service instance
   * const key = registry.unregister('catalog-service', '1.0.0', '127.0.0.1', 3000);
   */
  unregister(name, version, ip, port) {
    const key = this.getKey(name, version, ip, port);
    delete this.services[key];
    console.log(`Deleted service ${name}, version${version} at ${ip}:${port}`);

    return key;
  }
}

module.exports = Registry;
