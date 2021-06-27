# AUTO GENERATED FILE - DO NOT EDIT

dtDashTreeChecklist <- function(children=NULL, id=NULL, className=NULL, expanded=NULL, labels=NULL, nodeClassName=NULL, nodeStyle=NULL, selection=NULL, style=NULL, tree=NULL) {
    
    props <- list(children=children, id=id, className=className, expanded=expanded, labels=labels, nodeClassName=nodeClassName, nodeStyle=nodeStyle, selection=selection, style=style, tree=tree)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashTreeChecklist',
        namespace = 'dash_tree_checklist',
        propNames = c('children', 'id', 'className', 'expanded', 'labels', 'nodeClassName', 'nodeStyle', 'selection', 'style', 'tree'),
        package = 'dashTreeChecklist'
        )

    structure(component, class = c('dash_component', 'list'))
}
