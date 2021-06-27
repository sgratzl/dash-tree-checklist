# AUTO GENERATED FILE - DO NOT EDIT

export dt_dashtreechecklist

"""
    dt_dashtreechecklist(;kwargs...)
    dt_dashtreechecklist(children::Any;kwargs...)
    dt_dashtreechecklist(children_maker::Function;kwargs...)


A DashTreeChecklist component.
DashTreeChecklist shows an interactive parallel set / sankey diagram
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): children helper for dash
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `className` (String; optional): component CSS class
- `expanded` (Array of Strings; optional): list of expanded tree nodes
- `labels` (Dict; optional)
- `nodeClassName` (String; optional): node CSS class
- `nodeStyle` (Bool | Real | String | Dict | Array; optional): node CSS style
- `selection` (Array of Strings; optional): list of selected tree node ids
- `style` (Bool | Real | String | Dict | Array; optional): component CSS style
- `tree` (required): tree to display. tree has the following type: Array of lists containing elements 'id', 'name', 'disabled', 'children'.
Those elements have the following types:
  - `id` (String; required)
  - `name` (String; required)
  - `disabled` (Bool; optional)
  - `children` (optional): . children has the following type: Array of lists containing elements 'id', 'name', 'disabled', 'children'.
Those elements have the following types:
  - `id` (String; required)
  - `name` (String; required)
  - `disabled` (Bool; optional)
  - `children` (Array of Bool | Real | String | Dict | Arrays; optional)ss
"""
function dt_dashtreechecklist(; kwargs...)
        available_props = Symbol[:children, :id, :className, :expanded, :labels, :nodeClassName, :nodeStyle, :selection, :style, :tree]
        wild_props = Symbol[]
        return Component("dt_dashtreechecklist", "DashTreeChecklist", "dash_tree_checklist", available_props, wild_props; kwargs...)
end

dt_dashtreechecklist(children::Any; kwargs...) = dt_dashtreechecklist(;kwargs..., children = children)
dt_dashtreechecklist(children_maker::Function; kwargs...) = dt_dashtreechecklist(children_maker(); kwargs...)

