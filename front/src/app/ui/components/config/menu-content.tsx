import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
    configMenu: {
        id: string;
        children: React.ReactNode;
    }
}

export default function ConfigMenuContent(props: Props) {
    const { configMenu } = props;

    return (
        <div className="tab-pane fade show" id={configMenu.id} role="tabpanel">
            <h4 className="mb-3 d-sm-none">Pricing</h4>
            { configMenu.children }
        </div>
    );
}