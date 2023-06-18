import React from 'react';
import {HomeAssistant, ThreedyCondition, ThreedyConfig} from "../../types";
import TemperatureStat from "./TemperatureStat";
import { getEntity } from '../../Utils/HomeAssistant';
import Stat from "./Stat";
import TimeStat from "./TimeStat";

/**
 * Function to get the name opf an entity correspondingh to a given condition and the configured entity
 * @param config 
 * @param condition 
 * @returns 
 */
const getEntityName = (
    config: ThreedyConfig,
    condition: ThreedyCondition
): string | undefined => {
    const baseName = config.base_entity;
    switch (condition) {
        case 'Status':
            return `${baseName}_current_state`
        case 'Remaining':
            return `${baseName}_time_remaining`
        case 'Elapsed':
            return `${baseName}_time_elapsed`
        case 'Hotend':
            return `${baseName}_tool_1_current_temperature`
        case 'Bed':
            return `${baseName}_tool_bed_current_temperature`
        case 'Progress':
            return `${baseName}_progress`
        default:
            return undefined
    }
};


/**
 * Function to dynamically render a stat by determining what type of stat it is
 * @param hass
 * @param config
 * @param condition
 */
const renderCondition = (
    hass: HomeAssistant,
    config: ThreedyConfig,
    condition: ThreedyCondition | string
) => {
    
    const statusEntity = getEntity(hass, getEntityName(config, ThreedyCondition.Status));

    const printerStatus = statusEntity.state;

    switch (condition) {
        case ThreedyCondition.Status:
            return (
                <Stat
                    name={"Status"}
                    value={printerStatus}
                />
            )
        case ThreedyCondition.ETA:
            return (
                <TimeStat
                    timeEntity={ getEntity(hass, getEntityName(config, ThreedyCondition.Remaining)) }
                    condition={condition}
                    config={config}
                    direction={0}
                    status={printerStatus}
                />
            )
        case ThreedyCondition.Elapsed:
            return (
                <TimeStat
                    timeEntity={ getEntity(hass,getEntityName(config, condition)) }
                    condition={condition}
                    config={config}
                    direction={1}
                    status={printerStatus}
                />
            )

        case ThreedyCondition.Remaining:
            return (
                <TimeStat
                    timeEntity={ getEntity(hass, getEntityName(config, condition)) }
                    condition={condition}
                    config={config}
                    direction={-1}
                    status={printerStatus}
                />
            )

        case ThreedyCondition.Bed:
            return (
                <TemperatureStat
                    name={"Bed"}
                    temperatureEntity={ getEntity(hass, getEntityName(config, condition))  }
                    config={config}
                />
            )

        case ThreedyCondition.Hotend:
            return (
                <TemperatureStat
                    name={"Hotend"}
                    temperatureEntity={ getEntity(hass,getEntityName(config, condition)) }
                    config={config}
                />
            )


        default:
            return (
                <Stat
                    name={"Unknown"}
                    value={"<unknown>"}
                />
            )

    }

}

/**
 * Function to render all stats
 * @param hass
 * @param config
 */
const renderStats = (
    hass: HomeAssistant,
    config: ThreedyConfig
) => {

    return config.monitored.map(
        condition => renderCondition( hass, config, condition )
    )

}

const percentComplete = (
    hass: HomeAssistant,
    config: ThreedyConfig
) => {
    return (hass.states[getEntityName(config, ThreedyCondition.Progress)] || { state: -1.0 }).state;
}

export {
    renderStats,
    percentComplete,
    getEntityName
}
