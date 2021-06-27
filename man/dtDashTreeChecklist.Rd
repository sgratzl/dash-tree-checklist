% Auto-generated: do not edit by hand
\name{dtDashTreeChecklist}

\alias{dtDashTreeChecklist}

\title{DashTreeChecklist component}

\description{
DashTreeChecklist shows an interactive parallel set / sankey diagram
}

\usage{
dtDashTreeChecklist(children=NULL, id=NULL, className=NULL, expanded=NULL,
labels=NULL, nodeClassName=NULL, nodeStyle=NULL,
selection=NULL, style=NULL, tree=NULL)
}

\arguments{
\item{children}{A list of or a singular dash component, string or number. children helper for dash}

\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{className}{Character. component CSS class}

\item{expanded}{List of characters. list of expanded tree nodes}

\item{labels}{Named list. }

\item{nodeClassName}{Character. node CSS class}

\item{nodeStyle}{Logical | numeric | character | named list | unnamed list. node CSS style}

\item{selection}{List of characters. list of selected tree node ids}

\item{style}{Logical | numeric | character | named list | unnamed list. component CSS style}

\item{tree}{List of lists containing elements 'id', 'name', 'disabled', 'children'.
those elements have the following types:
  - id (character; required)
  - name (character; required)
  - disabled (logical; optional)
  - children (optional): . children has the following type: list of lists containing elements 'id', 'name', 'disabled', 'children'.
those elements have the following types:
  - id (character; required)
  - name (character; required)
  - disabled (logical; optional)
  - children (list of logical | numeric | character | named list | unnamed lists; optional)ss. tree to display}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

