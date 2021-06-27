# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashTreeChecklist(Component):
    """A DashTreeChecklist component.
DashTreeChecklist shows an interactive parallel set / sankey diagram

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    children helper for dash.

- id (string; default undefined):
    The ID used to identify this component in Dash callbacks.

- className (string; default undefined):
    component CSS class.

- expanded (list of strings; optional):
    list of expanded tree nodes.

- labels (dict; default undefined)

- nodeClassName (string; default undefined):
    node CSS class.

- nodeStyle (boolean | number | string | dict | list; default undefined):
    node CSS style.

- selection (list of strings; optional):
    list of selected tree node ids.

- style (boolean | number | string | dict | list; default undefined):
    component CSS style.

- tree (list of dicts; required):
    tree to display.

    `tree` is a list of dicts with keys:

    - children (list of dicts; optional)

        `children` is a list of dicts with keys:

        - children (list of boolean | number | string | dict | lists; optional)

        - disabled (boolean; optional)

        - id (string; required)

        - name (string; required)

    - disabled (boolean; optional)

    - id (string; required)

    - name (string; required)"""
    @_explicitize_args
    def __init__(self, children=None, id=Component.UNDEFINED, className=Component.UNDEFINED, style=Component.UNDEFINED, nodeClassName=Component.UNDEFINED, nodeStyle=Component.UNDEFINED, tree=Component.REQUIRED, selection=Component.UNDEFINED, expanded=Component.UNDEFINED, labels=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'className', 'expanded', 'labels', 'nodeClassName', 'nodeStyle', 'selection', 'style', 'tree']
        self._type = 'DashTreeChecklist'
        self._namespace = 'dash_tree_checklist'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'className', 'expanded', 'labels', 'nodeClassName', 'nodeStyle', 'selection', 'style', 'tree']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in ['tree']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(DashTreeChecklist, self).__init__(children=children, **args)
