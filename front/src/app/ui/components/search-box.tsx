import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    placeHolder: string;
}

export default function SearchBox(props: Props) {
    const { placeHolder } = props;

    return (
        <div className="search-box">
            <form className="position-relative">
                <input
                    className="form-control search-input search"
                    type="search"
                    placeholder={ placeHolder }
                    aria-label="Search"
                />
                <span className="fas fa-search search-box-icon"></span>
            </form>
        </div>
    );
}