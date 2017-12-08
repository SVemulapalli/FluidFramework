import * as nconf from "nconf";
import * as utils from "../utils";

export interface IContext {
    checkpoint(offset: number);
}

export interface IPartitionLambda {
    handler(message: utils.kafkaConsumer.IMessage): Promise<any>;
}

/**
 * Factory for creating lambda related objects
 */
export interface IPartitionLambdaFactory {
    /**
     * Constructs a new lambda
     */
    create(config: nconf.Provider, context: IContext): Promise<IPartitionLambda>;

    /**
     * Disposes of the lambda factory
     */
    dispose(): Promise<void>;
}

/**
 * Lambda plugin definition
 */
export interface IPlugin {
    /**
     * Creates and returns a new lambda factory. Config is provided should the factory need to load any resources
     * prior to being fully constructed.
     */
    create(config: nconf.Provider): Promise<IPartitionLambdaFactory>;
}
