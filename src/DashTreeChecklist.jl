
module DashTreeChecklist
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.2.0"

include("dt_dashtreechecklist.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_tree_checklist",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "dash_tree_checklist.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_tree_checklist.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
