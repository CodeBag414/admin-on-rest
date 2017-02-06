import { Children } from 'react';
import { createSelector } from 'reselect';

const getDefaultValues = (children, data = {}, defaultValue = {}) => {
    console.log('getDefaultValues')
    const globalDefaultValue = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    const defaultValueFromChildren = children
        .map(child => ({ source: child.props.source, defaultValue: child.props.defaultValue }))
        .reduce((prev, next) => {
            if (next.defaultValue != null) {
                prev[next.source] = typeof next.defaultValue === 'function' ? next.defaultValue() : next.defaultValue; // eslint-disable-line no-param-reassign
            }
            return prev;
        }, {});
    return { ...globalDefaultValue, ...defaultValueFromChildren, ...data };
};

const getChildren = (state, props) => props.children;
const getRecord = (state, props) => props.record;
const getDefaultValue = (state, props) => props.defaultValue;


export default createSelector(
    getChildren, getRecord, getDefaultValue,
    (children, record, defaultValue) => getDefaultValues(Children.toArray(children), record, defaultValue)
);
