import * as React from 'react'

/**
 * This defines all the possible styles that can be applied to a React component.
 */
export type Style = React.CSSProperties

/**
 * This kind of style maps are used across the app, wich match every component name to its style.
 */
export type StyleMap = { [name: string]: Style }

/**
 * This unifies all the React component that have just their children as React props.
 */
export interface JustChildren {
    children: React.ReactNode
}

/**
 * Interface for React components with children and style.
 */
export interface ChildrenAndStyleProps {
    children: React.ReactNode
    style?: Style
}

/**
 * Type for conditional rendering components.
 */
export type MaybeVisible<T> = { isVisible: boolean } & T