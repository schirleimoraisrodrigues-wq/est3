export const StrictMode = ({ children }) => children;
export function createElement(type, props, ...children) { return { type, props: { ...(props || {}), children } }; }
export function useState(initial) { let value = typeof initial === 'function' ? initial() : initial; return [value, (next) => { value = typeof next === 'function' ? next(value) : next; }]; }
export function useEffect() {}
export function useMemo(factory) { return factory(); }
export function createContext(defaultValue) { return { _currentValue: defaultValue, Provider: ({ value, children }) => { defaultValue = value; return children; } }; }
export function useContext(context) { return context._currentValue; }
export default { StrictMode, createElement, useState, useEffect, useMemo, createContext, useContext };
